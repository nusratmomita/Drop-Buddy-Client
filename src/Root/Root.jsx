import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div className='min-h-screen flex flex-col lg:max-w-7xl lg:mx-auto pt-5 pb-5'>
            <Header></Header>
            <div>
                <Outlet className='flex-grow lg:max-w-7xl lg:mx-auto pt-5 pb-5'></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;