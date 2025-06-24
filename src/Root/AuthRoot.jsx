import React from 'react';
import authImage from '.././assets/authImage.png'
import { Link, Outlet } from 'react-router';
import logo from ".././assets/logo.png"


const AuthRoot = () => {
    return (
        <div>
            <div className="mt-30 bg-base-200 p-12">
                <Link to='/'>
                    <div className='ml-15 flex'>
                        <img src={logo} alt="logo" />
                        <h1 className='text-2xl font-extrabold -ml-4 mt-5'>DropBuddy</h1>
                    </div>
                </Link>
                <div className="hero-content flex-row lg:flex-row-reverse">
                    <div className='bg-[#FAFDF0] min-h-screen flex items-center justify-center'>
                        <img
                            src={authImage}
                            className="flex-1 max-w-md rounded-lg shadow-2xl"
                        />
                    </div>
                    <div className='flex-1'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AuthRoot;