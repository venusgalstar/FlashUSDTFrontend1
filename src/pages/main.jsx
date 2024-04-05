import React, { useCallback, useState, useRef, useContext, useEffect } from 'react';
import { Carousel } from 'flowbite-react';
import { toast } from 'react-toastify';

import nftIcon from '../assets/gb_box.mp4';
import item1 from '../assets/item1.png';
import item2 from '../assets/item2.png';
import item3 from '../assets/item3.png';
import Web3Context from '../contexts/Web3Context';
import { WHITELIST_PERIOD } from '../utils/constants';
import { useAccount } from 'wagmi';

const Main = (props) => {
    const {address:walletAddress} = useAccount()
    const { minted, mintNFT, launchTimestamp, whitelisted } = useContext(Web3Context);
    const [isMintable, setMintable] = useState(false);
    const [timerId, setTimerId] = useState(0);
    const [restPeriod, setRestPeriod] = useState(0);

    const onHandleMint = async () => {
        console.log(">>> onHandleMint");
        mintNFT();
    }

    useEffect(() => {
        const _now = parseInt(Date.now() / 1000);
        if(timerId) clearInterval(timerId)
        if(launchTimestamp != 0 && launchTimestamp + WHITELIST_PERIOD > _now && timerId == 0) {
            setTimerId(setInterval(() => {
                const now_ = parseInt(Date.now() / 1000);
                const _rest = launchTimestamp + WHITELIST_PERIOD - now_;
                setRestPeriod(_rest > 0 ? _rest : 0);
            }, 1000))
        }

        console.log(">>>> launchTimestamp=", launchTimestamp, "minted=", minted, "whitelisted=", whitelisted, "now=", _now)

        if (launchTimestamp != 0 && !minted && (whitelisted || launchTimestamp + WHITELIST_PERIOD < _now))
            setMintable(true);
        else
            setMintable(false);
        setMintable(false);
    }, [minted, launchTimestamp, walletAddress, whitelisted])

    return (<div className='flex flex-col gap-8 justify-center text-white'>
        <div className='relative gap-4 pt-8 pb-4 px-6 rounded-3xl bg-gradient-to-b from-[#043091] via-[#001661] to-[#043091] w-12/13 md:w-1/3 mx-auto'>
            <div className='absolute top-[-128px] right-[-128px] z-[10]'>
                <img src={item1} />
            </div>
            <div className='absolute top-[240px] left-[-128px] z-[10]'>
                <img src={item2} />
            </div>
            <div className='absolute bottom-[-128px] right-[-128px] z-[10] scale-125'>
                <img src={item3} />
            </div>
            <div className='text-4xl text-center py-4 z-[20] pointer-events-none'>Mint your GrandPass</div>
            {timerId != 0 && <div className='text-xl text-center'>Whitelist Period: {parseInt(restPeriod / 60)} minutes {restPeriod % 60} seconds</div>}
            <div className='flex justify-center py-4 h-[256px]'>
                <video src={nftIcon} width={300} height={300} className='rounded-3xl' autoPlay={true} loop={true} />
            </div>
            <div className='flex justify-center py-4 z-[20]'>
                <button
                    type="button"
                    className={`text-[18px] text-white bg-gradient-to-r from-[#0135ab] to-[#0135ab] ${isMintable?"hover:bg-gradient-to-l hover:to-[#0b2d7c]":""} focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 ${isMintable? "":"cursor-not-allowed"}`}
                    disabled={!isMintable}
                    onClick={onHandleMint}
                >
                    Mint Now
                </button>
            </div>
            {minted ?
                <div className="w-full text-center">
                    Cannot mint anymore!
                </div>
                :
            ((!whitelisted && restPeriod != 0) ? 
                <div className='w-full text-center'>
                    You're not whitelisted!
                </div> 
                :
                <div></div>)
            }
            <div className='w-full text-center'>
                Minting finished!
            </div> 
        </div>
    </div>)
}

export default Main;