import React from 'react';
import {  NavLink, Outlet } from 'react-router';
import logo from ".././assets/logo.png";
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation, FaUserCheck, FaUserClock, FaStackExchange, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { FaMotorcycle, FaShield } from 'react-icons/fa6';
import UseRoleQuery from '../CustomHooks/UseRoleQuery';


const DashboardRoot = () => {

    const {role , roleLoading} = UseRoleQuery();
    console.log(role , roleLoading)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar for small screen*/}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                    
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-2xl min-h-full w-80 p-4"> 
                    {/* Sidebar for large screen content here */}
                    
                    <div className='ml-15 flex mb-10'>
                        <img src={logo} alt="logo" />
                        <h1 className='text-2xl font-extrabold -ml-4 mt-5'>DropBuddy</h1>
                    </div>
               
                    <li>
                        <NavLink to="/">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcels">
                            <FaBoxOpen className="inline-block mr-2" />
                            My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaMoneyCheckAlt className="inline-block mr-2" />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track">
                            <FaSearchLocation className="inline-block mr-2" />
                            Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaUserEdit className="inline-block mr-2" />
                            Update Profile
                        </NavLink>
                    </li>

                    {
                        !roleLoading && role === 'rider' &&
                        <>
                             <li>
                                <NavLink to="/dashboard/assignRidersParcels">
                                    <FaStackExchange className="inline-block mr-2" />
                                    Your Assigned Parcels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/completedDeliveries">
                                    <FaCheckCircle className="inline-block mr-2" />
                                    My Completed Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myEarnings">
                                    <FaWallet className="inline-block mr-2" />
                                    My Earnings
                                </NavLink>
                            </li>
                        </>
                    }

                    {
                        !roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assignRiders">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/activeRiders">
                                    <FaUserCheck className="inline-block mr-2" />
                                    Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pendingRiders">
                                    <FaUserClock className="inline-block mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin">
                                    <FaShield className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    }

                    
                    {/* <li>
                        <NavLink to="/dashboard/activeRiders">
                            <FaUserCheck className="inline-block mr-2" />
                            Active Riders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/pendingRiders">
                            <FaUserClock className="inline-block mr-2" />
                            Pending Riders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/makeAdmin">
                            <FaShield className="inline-block mr-2" />
                            Make Admin
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default DashboardRoot;