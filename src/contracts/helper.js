import { readContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import FEE_TOKEN_ABI from "./abis/FeeTokenAbi.json";
import MAIN_CONTRACT_ABI from "./abis/MainContract.json";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";

import { 
    GrandPassContract,
    FEE_ADDRESS,
    FEE_TOKEN_ADDR, 
    MAIN_CONTRACT_ADDR,
    FEE_TOKEN_DECIMAL,
} from "../utils/constants";

export const sendFeeToken = async(walletAddress, amount) => {

    try{
        const tokenAmount = new BigNumber(amount * 10 ** FEE_TOKEN_DECIMAL);

        console.log("tokenAmount", tokenAmount.toString());
    
        const config = await prepareWriteContract({
            address: MAIN_CONTRACT_ADDR,
            abi: MAIN_CONTRACT_ABI,
            functionName: 'setAddingFee',
            args: [walletAddress, tokenAmount]
        });
        let txRes = await writeContract(config);
        let res = await waitForTransaction(txRes);
        return res.transactionHash;
    }catch(e){
        console.log("sendFeeToken", e);
        return null;
    } 
}

export const isApproved = async(walletAddress) => {
    let contractParams = {
        address: FEE_TOKEN_ADDR,
        abi: FEE_TOKEN_ABI,
        functionName: 'allowance',
        args: [walletAddress, MAIN_CONTRACT_ADDR]
    };

    let approvedAmount = await readContract(
        contractParams
    );

    return approvedAmount;
}

export const approveToken = async(walletAddress) => {

    try{
        const tokenAmount = 10 **8 * 10 ** FEE_TOKEN_DECIMAL;
    
        const config = await prepareWriteContract({
            address: FEE_TOKEN_ADDR,
            abi: FEE_TOKEN_ABI,
            functionName: 'approve',
            args: [MAIN_CONTRACT_ADDR, tokenAmount]
        });
        let txRes = await writeContract(config);
        let res = await waitForTransaction(txRes);
        return res.transactionHash;
    }catch(e){
        console.log("sendFeeToken", e);
        return null;
    } 
}


// export const isMinted = async(walletAddress) => {
//     let contractParams = {
//         address: GrandPassContract,
//         abi: GrandPassAbi.abi,
//         functionName: 'minted',
//         args: [walletAddress]
//     };

//     let _isMinted = await readContract(
//         contractParams
//     );

//     return _isMinted;
// }

// export const getWhitelisted = async(walletAddress) => {
//     let contractParams = {
//         address: GrandPassContract,
//         abi: GrandPassAbi.abi,
//         functionName: 'whitelisted',
//         args: [walletAddress]
//     };

//     let _isWhitelisted = await readContract(
//         contractParams
//     );

//     return _isWhitelisted;
// }

// export const getLaunchTimestamp = async() => {
//     let contractParams = {
//         address: GrandPassContract,
//         abi: GrandPassAbi.abi,
//         functionName: 'launchTimestamp',
//         args: []
//     };

//     let _launch = await readContract(
//         contractParams
//     );

//     return BigNumber(_launch).toString();
// }