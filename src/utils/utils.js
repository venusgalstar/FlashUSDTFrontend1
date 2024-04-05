import axios from "axios";
import { toast } from "react-toastify";

// import { API_PATH } from "./constants";

export const getBTCfromSats = (amount) => {
    return parseFloat(amount) / 100000000.0;
}

export const getDisplayString = (str, subLength1, subLength2) => {
    return `${str.toString().substr(0, subLength1)}...${str
      .toString()
      .substr(str.length - subLength2, str.length)}`;
};

export const formatDateTime = (timestamp) => {
    const _time = new Date(timestamp);
    const _hour = _time.getHours();
    const _minute = _time.getMinutes();
    const _second = _time.getSeconds();
    const res = `${_time.getMonth() + 1}/${_time.getDate()}/${_time.getFullYear()}. ${_hour < 10 ? "0" + _hour:_hour}:${_minute<10?"0"+_minute:_minute}:${_second<10?"0"+_second:_second}`;
    return res;
}

export const getEstimationTime = (feeRate) => {
    const feeRateValue = parseFloat(feeRate);
    if (feeRateValue < 8) {
        return ">1 hour";
    } else if(feeRateValue < 10) {
        return "~1 hour";
    } else if(feeRateValue >= 10) {
        return "~15 minutes";
    }
    return "Can't estimate";
}

// export const axiosPost = async (url, params, config = {}) => {
//     try {
//         const res = await axios.post(`${API_PATH}${url}`, params, config);
//         return {
//             success: true,
//             data: res.data
//         }
//     } catch (err) {
//         return {
//             success: false,
//             data: err
//         }
//     }
// }

// export const axiosGet = async (url) => {
//     try {
//         const res = await axios.get(`${API_PATH}${url}`);
//         return {
//             success: true,
//             data: res.data
//         }
//     } catch (err) {
//         return {
//             success: false,
//             data: err
//         }
//     }
// }

export const getShortAddress = (address, length = 4) => {
    return address && [address.substr(0, length), address.substr(42 - length, length)].join("...");
}

export const showToast = (flag, text) => {
    console.log(">>> showToast <<<", flag, text);
    let msgLen = text.length;
    text = text.substring(0, 100);
    if (msgLen > 100) text += "...";
    if (flag === 'e') {
        toast.error(text, {
            theme: 'dark',
            position: 'bottom-right',
            autoClose: 2000,
            pauseOnHover: false
        })
    } else if (flag === 's') {
        toast.success(text, {
            theme: 'dark',
            position: 'bottom-right',
            autoClose: 3000,
            pauseOnHover: false
        })
    } else if (flag === 'w') {
        toast.warn(text, {
            theme: 'dark',
            position: 'bottom-right',
            autoClose: 3000,
            pauseOnHover: false
        })
    }
}