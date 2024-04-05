import React from 'react';
import { Navbar } from 'flowbite-react';

import logoIcon from "../assets/logo.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
    return (
    <Navbar className="bg-transparent max-w-screen-2xl mx-auto mt-[20px]" fluid>
        <Navbar.Brand href="https://www.grandbase.io" target='_blank'>
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Flash USDT</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <ConnectButton />
        </Navbar.Collapse>
    </Navbar>)
}

export default Header;