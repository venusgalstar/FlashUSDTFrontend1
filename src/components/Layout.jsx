import React from 'react';
import Header from './Header';

const Layout = (props) => {
    return (
    <div>
        <Header />
        <div className='pt-[100px] md:mx-32 mb-12'>
            {props.children}
        </div>
    </div>)
}

export default Layout;