import React, { useContext } from 'react';
import { Link, Links, NavLink } from 'react-router';
import logo from "../../assets/logo.png"
import hamburger from '../../assets/hamburger-menu.png';
import './Header.css'
import { AuthContext } from '../../Authentication/AuthContext';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {

    const {user , handleLogout} = useContext(AuthContext);

    const handleSignOut = () => {
        handleLogout()
        .then(()=>{
            toast.success("You've logged out successfully" );
        })
        .catch(()=>{
        })
    }


    const links = 
    <>
        <li className="navLinks mt-2"><NavLink to='/'>Home</NavLink></li>
        <li className="navLinks mt-2"><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
        <li className="navLinks mt-2"><NavLink to='/coverage'>Coverage</NavLink></li>
        <li className="navLinks mt-2"><NavLink to='/'>Be a Rider</NavLink></li>
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
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow text-3xl">
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
                <div className='flex gap-2 lg:gap-4 justify-center items-center'>
                    {
                        user && user?.email ?
                        <>
                            <img className="w-10 h-10 bg-gray-300 p-1 rounded-full" src={user?.photoURL} alt="userPhoto" />
                            <h1 className='text-black text-2xl font-bold'>Hi,{user?.displayName}</h1>
                            {/* <h1>{user?.email}</h1> */}
                        </>
                        :
                        <>
                        <button className='ml-5 cursor-pointer p-2 flex items-center gap-1 text-3xl font-semibold  bg-[#CAEB66]'><NavLink to="/login">Login</NavLink></button>
                        <button className='ml-5 cursor-pointer p-2 flex items-center gap-1 text-3xl font-semibold bg-[#CAEB66]'><NavLink to="/register">Register</NavLink></button>
                        <FaUserCircle className="w-15 h-15 bg-white p-1 rounded-full" size={25}></FaUserCircle>
                        </>
                    }
                </div>
                {
                    (user && user?.email) ?
                    <button className="ml-5 cursor-pointer p-2 flex items-center gap-1 text-3xl font-semibold rounded-2xl bg-[#CAEB66]" onClick={handleSignOut} ><FiLogOut size={25} color='black'></FiLogOut>Logout</button>
                    :
                    "" 
                }
            </div>
        </div>
    );
};

export default Header;