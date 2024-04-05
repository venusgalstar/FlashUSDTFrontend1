import { createContext, useCallback, useContext } from "react";
import { useGlobal } from "./GlobalContext";
// import { axiosPost } from "../utils/utils";

export const APIContext = createContext();

export const APIProvider = (props) => {

    const { showLoading, hideLoading } = useGlobal();

    // const createCollection = useCallback(async (params) => {
    //     showLoading("Creating collection...");
    //     const res = await axiosPost("/collections/create", params);
    //     hideLoading();
    //     return res;
    // }, []);

    return (
        <APIContext.Provider value={{ /* createCollection */ }}>
            {props.children}
        </APIContext.Provider>
    )   
}

export const useAPI = () => {
    const apiManager = useContext(APIContext);
    return apiManager || [{}, async () => { }];
}