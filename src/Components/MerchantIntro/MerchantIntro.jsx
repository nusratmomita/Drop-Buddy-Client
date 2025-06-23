import React from 'react';
import parcelLocation from '../../assets/location-merchant.png'

const MerchantIntro = () => {
    return (
        <div data-aos="flip-left"
             data-aos-easing="ease-out-cubic"
             data-aos-duration="2000" 
             className='bg-[#03373D] bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat text-white p-15 rounded-4xl my-20 flex flex-col lg:flex-row justify-center items-center gap-2'>
            <div className='space-y-5'>
                <h1 className='text-4xl font-bold'>Merchant and Customer Satisfaction <br /> is Our First Priority</h1>
                <p className='text-2xl font-sans'>We offer the lowest delivery charge with  the highest value along with <br /> 100% safety of your product. Pathao courier delivers your parcels in <br /> every corner of Bangladesh right on time.</p>
                <div className='space-x-10 font-sans mt-8'>
                    <button className='bg-[#CAEB66] text-black text-2xl p-4 rounded-4xl cursor-pointer font-bold'>Become a Merchant</button>
                    <button className='text-[#CAEB66] border-2 border-[#CAEB66] text-2xl p-4 rounded-4xl cursor-pointer font-bold'>Earn with DropBuddy Courier</button>
                </div>
            </div>
            <div>
                <img src={parcelLocation} alt="parcelLocation" />
            </div>
        </div>

    );
};

export default MerchantIntro;