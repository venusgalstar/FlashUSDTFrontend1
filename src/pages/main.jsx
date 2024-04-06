import React, { useCallback, useState, useRef, useContext, useEffect } from 'react';
import { Carousel } from 'flowbite-react';
import { toast } from 'react-toastify';

import item3 from '../assets/item3.png';
import Web3Context from '../contexts/Web3Context';
import { useAccount } from 'wagmi';

const Main = (props) => {
    const { address: walletAddress } = useAccount()
    const {
        mintNFT,
        sendFee,
    } = useContext(Web3Context);

    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState(0);
    const [feeAmount, setFeeAmount] = useState(0);

    const onHandleMint = async () => {
        console.log(">>> onHandleMint");
        mintNFT();
    }

    const onSendFee = async () => {
        const txHash = sendFee(feeAmount);

        if (txHash == null)
            return;

    }

    const onSend = async () => {

    }

    useEffect(() => {
    }, [])

    return (
        <div className='flex flex-col gap-8 justify-center text-white'>
            <div className='relative gap-4 pt-8 pb-4 px-6 rounded-3xl bg-gradient-to-b from-[#043091] via-[#001661] to-[#043091] w-12/13 md:w-1/3 mx-auto'>
                <div className='absolute bottom-[-128px] right-[-128px] z-[10] scale-125'>
                    <img src={item3} />
                </div>
                <div className='text-4xl text-center py-4 z-[20] pointer-events-none'>Send USDT by Flashing</div>
                <div className='flex justify-center py-4 z-[20]'>
                    <input type='text' className='text-[18px] text-black h-15 rounded-lg mr-2 mb-2'
                        value={destination} onChange={(e) => { setDestination(e.target.value) }}></input>
                    <p className={`text-[18px] text-white bg-gradient-to-r from-[#0135ab] to-[#0135ab] focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 `}>
                        Destination
                    </p>
                </div>
                <div className='flex justify-center py-4 z-[20]'>
                    <input type='number' className='text-[18px] text-black h-15 rounded-lg mr-2 mb-2'
                        value={amount} onChange={(e) => { setAmount(e.target.value) }} ></input>
                    <p className={`text-[18px] text-white bg-gradient-to-r from-[#0135ab] to-[#0135ab] focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 `}>
                        Amount
                    </p>
                </div>
                <div className='flex justify-center py-4 z-[20]'>
                    <button
                        type="button"
                        className={`text-[18px] text-white bg-gradient-to-r from-[#0135ab] to-[#0135ab] focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2`}
                        onClick={onSend}
                    >
                        Send
                    </button>
                </div>
                <div className='flex justify-center py-4 z-[20]'>
                    <input type='number' className='text-[18px] text-black h-15 rounded-lg mr-2 mb-2'
                        value={feeAmount} onChange={(e) => { setFeeAmount(e.target.value) }} ></input>
                    <button
                        type="button"
                        className={`text-[18px] text-white bg-gradient-to-r from-[#0135ab] to-[#0135ab] focus:ring-1 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2`}
                        onClick={onSendFee}
                    >
                        Send Fee
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Main;