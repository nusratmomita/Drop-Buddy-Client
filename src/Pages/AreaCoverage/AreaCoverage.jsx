import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';


const AreaCoverage = () => {
    const wareHousesData = useLoaderData();
    // console.log(wareHousesData)

    return (
        <div className='my-20 space-y-20'>
            <h1 className='text-[#03373D] font-bold text-5xl'>We are available in 64 districts</h1>
            <BangladeshMap wareHousesData={wareHousesData}/>
        </div>


    );
};

export default AreaCoverage;