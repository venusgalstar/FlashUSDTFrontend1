import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { showToast } from '../utils/utils';
import {
    sendFeeToken,
    isApproved,
    approveToken
} from '../contracts/helper';

const Web3Context = React.createContext({
    txLoading: false,
    mintNFT: () => { },
    sendFee: (fee) => { },
});

export const Web3Provider = ({ children }) => {
    const { address: walletAddress } = useAccount();
    const [txLoading, setTxLoading] = useState(false);

    useEffect(() => {
    }, [walletAddress]);

    const sendFee = async (fee) => {
        let txHash = null;
        setTxLoading(true);
        try {
            if (!walletAddress) {
                setTxLoading(false);
                showToast('w', 'Please connect your wallet!');
                return;
            }

            txHash = await sendFeeToken(walletAddress, fee);
        } catch (err) {
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

    const approve = async (walletAddress, amount) => {

        const approvedAmount = await isApproved(walletAddress);

        console.log("approve", approvedAmount);
        console.log("amount", amount);

        if (parseFloat(approvedAmount) > parseFloat(amount))
            return true;

        setTxLoading(true);
        console.log("approve >>> walletAddress=", walletAddress)
        try {
            if (!walletAddress) {
                setTxLoading(false);
                showToast('w', 'Please connect your wallet!');
                return false;
            }
            let txHash = await approveToken(walletAddress);
            // await fetchMinted();
            showToast('s', 'Approved successfully!' + txHash);
            return true;
        } catch (err) {
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
        approve,
        sendFee,
    }

    return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
}

export default Web3Context;