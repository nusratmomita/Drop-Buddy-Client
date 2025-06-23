import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { BsFillGiftFill } from "react-icons/bs";
import OurServicesCard from './OurServicesCard';



const OurServices = () => {
    const services = [
    {
        "icon" : TbTruckDelivery,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
        "icon" : FaMapMarkedAlt,
        "title": "Nationwide Delivery",
        "description": "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
        "icon" : FaHandHoldingUsd,
        "title": "Fulfillment Solution",
        "description": "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
        "icon" : MdMapsHomeWork,
        "title": "Cash on Home Delivery",
        "description": "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
        "icon" : BsFillHouseCheckFill,
        "title": "Corporate Service / Contract In Logistics",
        "description": "Customized corporate services which includes warehouse and inventory management support."
    },
    {
        "icon" : BsFillGiftFill,
        "title": "Parcel Return",
        "description": "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    }
]

    return (
        <div className='mt-30 bg-[#03373D] p-20 text-center rounded-3xl mb-20'>
            <h1 className='text-5xl mb-5 text-white font-bold'>Our Services</h1>
            <p className='text-[#DADADA] text-3xl'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className='mt-10 mb-10 grid gap-20 grid-cols-1 md:grid-cols-3 lg:grid-cols-3'>
                {
                    services.map((service,index)=> <OurServicesCard key={index} service={service}></OurServicesCard>)
                }
            </div>
        </div>
    );
};

export default OurServices;