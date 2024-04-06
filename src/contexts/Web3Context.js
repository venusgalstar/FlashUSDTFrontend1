import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Web3 from 'web3';
import { showToast } from '../utils/utils';
import { sendFeeToken } from '../contracts/helper';
import { web3_mintNFT } from '../contracts/grandpass';

const Web3Context = React.createContext({
    txLoading: false,
    mintNFT: () => {},
    sendFee: (fee) => {},
});

export const Web3Provider = ({children}) => {
    const { address: walletAddress } = useAccount();
    const [txLoading, setTxLoading] = useState(false);

    useEffect(() => {
    }, [walletAddress]);

    const sendFee = async (fee) => {
        let txHash = null;
        setTxLoading(true);
        try{
            if(!walletAddress) {
                setTxLoading(false);
                showToast('w', 'Please connect your wallet!');
                return;
            }

            txHash = await sendFeeToken(fee);
        }catch(err){
            console.log(err);
            if (err.message && err.message.includes("User denied transaction signature")) {
                showToast('e', 'Tx signature denied!');
            } else {
                showToast('e', 'Minting failed!');
            }
        }
        setTxLoading(false);
        return txHash;
    }

    const mintNFT = async () => {
        setTxLoading(true);
        console.log("mintNFT >>> walletAddress=", walletAddress)
        try {
            if(!walletAddress) {
                setTxLoading(false);
                showToast('w', 'Please connect your wallet!');
                return;
            }
            let txHash = await web3_mintNFT(walletAddress);
            // await fetchMinted();
            showToast('s', 'Minted successfully!');
        } catch(err) {
            console.log(err);
            if (err.message && err.message.includes("User denied transaction signature")) {
                showToast('e', 'Tx signature denied!');
            } else {
                showToast('e', 'Minting failed!');
            }
        }
        setTxLoading(false);
    }

    const context = {
        txLoading,
        mintNFT,
        sendFee,
    }

    return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
}

export default Web3Context;