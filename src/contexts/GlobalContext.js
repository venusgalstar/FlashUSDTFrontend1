import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
// import { axiosGet, axiosPost } from "../utils/utils";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {

    const [loading, setLoading] = useState({
        status: false,
        text: ""
    });

    const showLoading = (text) => {
        setLoading({
            status: true,
            text
        })
    }

    const hideLoading = () => {
        setLoading({
            status: false,
            text: ""
        });
    }

    // const invokeServer = useCallback(async(method, url, params) => {
    //     if (method === "post") {
    //         return axiosPost(url, params);
    //     } else if(method === "get") {
    //         return axiosGet(url);
    //     }
    // }, [])

    const stringFormat = useCallback((x) => {
        if (x === undefined || x === null) return ''
        
        let t = x.toString();
        let decimalPosition = t.indexOf('.');
        if (decimalPosition < 0) decimalPosition = t.length;
        
        if (decimalPosition > 0) {
          let i;
          for (i = decimalPosition - 3; i > 0; i -= 3) {
            t = t.slice(0, i) + ',' + t.slice(i);
            decimalPosition += 1
          }
          for (i = decimalPosition + 4; i < t.length; i += 4) {
            t = t.slice(0, i) + ',' + t.slice(i);
          }
        }
        return t;
      }, [])

    return (
        <React.StrictMode>
            <GlobalContext.Provider value={{ /* invokeServer, */ stringFormat, loading, showLoading, hideLoading }}>
                {children}
            </GlobalContext.Provider>
        </React.StrictMode>
    )
}

export const useGlobal = () => {
    const globalManager = useContext(GlobalContext);
    return globalManager || [{}, async() => { }];
}
