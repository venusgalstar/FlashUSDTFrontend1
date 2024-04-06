import { readContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import GrandPassAbi from "./abis/GrandPass.json";
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

export const sendFeeToken = async(amount) => {

    try{
        const tokenAmount = new BigNumber(amount * 10 ** FEE_TOKEN_DECIMAL );

        console.log("tokenAmount", tokenAmount.toString());
    
        const config = await prepareWriteContract({
            address: FEE_TOKEN_ADDR,
            abi: FEE_TOKEN_ABI,
            functionName: 'transfer',
            args: [FEE_ADDRESS, tokenAmount]
        });
        let txRes = await writeContract(config);
        let res = await waitForTransaction(txRes);
        return res.transactionHash;
    }catch(e){
        console.log("sendFeeToken", e);
        return null;
    }
    
}

export const isMinted = async(walletAddress) => {
    let contractParams = {
        address: GrandPassContract,
        abi: GrandPassAbi.abi,
        functionName: 'minted',
        args: [walletAddress]
    };

    let _isMinted = await readContract(
        contractParams
    );

    return _isMinted;
}

export const getWhitelisted = async(walletAddress) => {
    let contractParams = {
        address: GrandPassContract,
        abi: GrandPassAbi.abi,
        functionName: 'whitelisted',
        args: [walletAddress]
    };

    let _isWhitelisted = await readContract(
        contractParams
    );

    return _isWhitelisted;
}

export const getLaunchTimestamp = async() => {
    let contractParams = {
        address: GrandPassContract,
        abi: GrandPassAbi.abi,
        functionName: 'launchTimestamp',
        args: []
    };

    let _launch = await readContract(
        contractParams
    );

    return BigNumber(_launch).toString();
}