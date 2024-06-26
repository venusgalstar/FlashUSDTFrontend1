import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import item3 from '../assets/item3.png';
import Web3Context from '../contexts/Web3Context';
import { useAccount } from 'wagmi';

const baseURL = 'http://localhost:5000/';

const Main = (props) => {
    const { address: walletAddress } = useAccount()
    const {
        sendFee,
        approve,
    } = useContext(Web3Context);

    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState(0);
    const [feeAmount, setFeeAmount] = useState(0);

    const sendFeeToServerPost = async (fromAddress, amount, txHash) => {
        const response = await axios.post(baseURL + 'sendFee',
            {
                from: fromAddress,
                amount: amount,
                txHash: txHash,
            }
        );
        console.log('Response:', response.data);
    }

    const sendFlash = async (from, to, amount) => {
        const response = await axios.post(baseURL + 'sendToken',
            {
                from: from,
                to: to,
                amount: amount,
            }
        );
        console.log('Response:', response.data);
    }

    const onSendFee = async () => {
        const txHash = await sendFee(feeAmount);

        if (txHash == null)
            return;

        await sendFeeToServerPost(walletAddress, feeAmount, txHash);
    }

    const onSend = async () => {
        
        const txHash = await approve(walletAddress, amount);

        if( txHash == null ){
            console.log("Didn't approved");
            return;
        }
        
        await sendFlash(walletAddress, destination, amount);
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