import React from 'react';
import { FaHandHoldingDroplet } from 'react-icons/fa6';
import { MdDeliveryDining } from "react-icons/md";
import { TbCashRegister } from "react-icons/tb";
import { TbPackages } from "react-icons/tb";

const HowItWorks = () => {
    return (
        <div className='mt-20'>
            <h1 className='text-3xl font-bold text-black'>How It Works</h1>

            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='bg-white p-3 rounded-2xl shadow hover:shadow-lg transition space-y-5'>
                    <MdDeliveryDining className="mt-5 text-4xl text-blue-600" />
                    <h1 className='font-bold mt-2 text-2xl'>Booking Pick & Drop</h1>
                    <p className='text-xl'>We make it easy to book pickups and drop-offs for all your deliveries, ensuring your parcels move quickly and reliably.</p>
                </div>

                <div className='bg-white p-3 rounded-2xl shadow hover:shadow-lg transition space-y-5'>
                    <TbCashRegister className="mt-5 text-4xl text-green-600" />
                    <h1 className='font-bold mt-2 text-2xl'>Cash On Delivery</h1>
                    <p className='text-xl'>Accept payments upon delivery, making it seamless for customers to pay when they receive their order.</p>
                </div>

                <div className='bg-white p-3 rounded-2xl shadow hover:shadow-lg transition space-y-5'>
                    <TbPackages className="mt-5 text-4xl text-yellow-600" />
                    <h1 className='font-bold mt-2 text-2xl'>Delivery Hub</h1>
                    <p className='text-xl'>Our delivery hubs are strategically located for quick dispatch and safe storage, guaranteeing timely deliveries every time.</p>
                </div>

                <div className='bg-white p-3 rounded-2xl shadow hover:shadow-lg transition space-y-5'>
                    <FaHandHoldingDroplet className="mt-5 text-4xl text-red-600" />
                    <h1 className='font-bold mt-2 text-2xl'>Booking SME & Corporate</h1>
                    <p className='text-xl'>Custom logistics services designed for small businesses and corporate needs, making bulk shipments simple and efficient.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
