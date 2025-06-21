import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../../assets/logo.png"

const Header = () => {

    const links = 
    <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/'>Services</NavLink></li>
        <li><NavLink to='/'>Coverage</NavLink></li>
        <li><NavLink to='/'>About Us</NavLink></li>
        <li><NavLink to='/'>Pricing</NavLink></li>
        <li><NavLink to='/'>Be a Rider</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-3xl">
            <div className="navbar-start p-5">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-3xl">
                    {
                        links
                    }
                </ul>
                </div>
                <Link to='/'>
                    <div className='flex justify-center items-end'>
                        <img src={logo} alt="logo" />
                        <h1 className='text-2xl font-extrabold -ml-4'>DropBuddy</h1>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1  text-2xl">
                {
                    links
                }
                </ul>
            </div>
            <div className="navbar-end">
                <button className='rounded-xl mr-5 btn text-gray-600 bg-white'>Sign in</button>
                <button className='rounded-xl btn text-black bg-[#CAEB66]'>Be a Rider </button>
            </div>
        </div>
    );
};

export default Header;