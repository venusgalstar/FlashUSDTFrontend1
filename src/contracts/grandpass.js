import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core"
import { GrandPassContract } from "../utils/constants"
import GrandPassAbi from "./abis/GrandPass.json";

export const web3_mintNFT = async(walletAddress) => {
    const config = await prepareWriteContract({
        address: GrandPassContract,
        abi: GrandPassAbi.abi,
        functionName: 'mint',
        args: [walletAddress]
    });
    let txRes = await writeContract(config);
    let res = await waitForTransaction(txRes);
    return res.transactionHash;
}