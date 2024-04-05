import React from 'react';
import { Navbar } from 'flowbite-react';

import logoIcon from "../assets/logo.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
    return (
    <Navbar className="bg-transparent max-w-screen-2xl mx-auto mt-[20px]" fluid>
        <Navbar.Brand href="https://www.grandbase.io" target='_blank'>
            <img src={logoIcon} className="h-12 mr-3" alt="grandbase Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Grand Base</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <ConnectButton />
        </Navbar.Collapse>
    </Navbar>)
}

export default Header;