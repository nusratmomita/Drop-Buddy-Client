import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div className='mt-5 max-w-7xl mx-auto pt-5'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;