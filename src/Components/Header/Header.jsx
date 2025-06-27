import React from 'react';
import { Link, Links, NavLink } from 'react-router';
import logo from "../../assets/logo.png"
import hamburger from '../../assets/hamburger-menu.png';
import './Header.css'

const Header = () => {

    const links = 
    <>
        <li className='navLinks'><NavLink to='/'>Home</NavLink></li>
        <li className="navLinks" ><NavLink to='/'>Services</NavLink></li>
        <li className="navLinks" ><NavLink to='/coverage'>Coverage</NavLink></li>
        <li className="navLinks" ><NavLink to='/'>About Us</NavLink></li>
        <li className="navLinks" ><NavLink to='/'>Pricing</NavLink></li>
        <li className="navLinks" ><NavLink to='/'>Be a Rider</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-3xl">
            <div className="navbar-start p-5">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden w-15 h-15 hover:bg-gray-100 hover:rounded-4xl mr-2">
                    <img src={hamburger} alt="" />
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
            <div className="navbar-end ml-30">
                <Link to='/login' className='rounded-xl mr-5 btn text-gray-600 bg-white text-2xl'>
                    <button className='cursor-pointer'>Log in</button>
                </Link>
                <Link to='/register' className='rounded-xl mr-5 btn text-gray-600 bg-white text-2xl'>
                    <button className='cursor-pointer'>Register</button>
                </Link>                
            </div>
        </div>
    );
};

export default Header;