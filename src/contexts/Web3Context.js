import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Web3 from 'web3';
import { showToast } from '../utils/utils';
import { getLaunchTimestamp, getWhitelisted, isMinted } from '../contracts/helper';
import { web3_mintNFT } from '../contracts/grandpass';

const Web3Context = React.createContext({
    txLoading: false,
    minted: false,
    launchTimestamp: 0,
    whitelisted: false,
    mintNFT: () => {}
});

export const Web3Provider = ({children}) => {
    const { address: walletAddress } = useAccount();
    const [minted, setMinted] = useState(false);
    const [txLoading, setTxLoading] = useState(false);
    const [launchTimestamp, setLaunchTimestamp] = useState(0);
    const [whitelisted, setWhitelisted] = useState(false);

    const fetchMinted = useCallback(async () => {
        if (walletAddress) {
            let _isMinted = await isMinted(walletAddress);
            setMinted(_isMinted);
        }
    }, [walletAddress])

    const fetchWhitelisted = useCallback(async() => {
        if (walletAddress) {
            let _isWhitelisted = await getWhitelisted(walletAddress);
            setWhitelisted(_isWhitelisted);
        }
    }, [walletAddress])

    const fetchLaunchTimestamp = async () => {
        let _launchTimestamp = await getLaunchTimestamp();
        setLaunchTimestamp(parseInt(_launchTimestamp));
    }

    useEffect(() => {
        fetchLaunchTimestamp()
    }, []);

    useEffect(() => {
        fetchMinted();
        fetchWhitelisted();
    }, [walletAddress]);

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
            await fetchMinted();
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
        minted,
        txLoading,
        launchTimestamp,
        whitelisted,
        mintNFT
    }

    return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
}

export default Web3Context;