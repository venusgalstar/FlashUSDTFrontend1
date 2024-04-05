import { readContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import GrandPassAbi from "./abis/GrandPass.json";
import { GrandPassContract } from "../utils/constants";


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