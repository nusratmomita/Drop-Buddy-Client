import React from 'react';
import parcel from '../../assets/live-tracking.png'
import safe from '../../assets/safe-delivery.png'
import support from '../../assets/support.jpg'

const ServiceIllustration = () => {
    return (
        <div className='mt-30 space-y-10 mb-20'>
            <div data-aos="fade-right" data-aos-delay="0" data-aos-duration="1000" className='p-5 bg-white flex gap-15 justify-center items-center rounded-3xl'>
                <img src={parcel} alt="parcel" />
                <div className="h-50 border-l-2 border-dashed border-[#03464D]"></div>
                <div>
                    <h1 className='text-[#03373D] text-4xl font-bold'>Live Parcel Tracking</h1>
                    <p className='mt-5 text-gray-700 text-2xl font-bold'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
            <div  data-aos="fade-left" data-aos-delay="0" data-aos-duration="1000" className='p-5 bg-white flex gap-15 justify-center items-center rounded-3xl'>
                <img src={safe} alt="parcel" />
                <div className="h-50 border-l-2 border-dashed border-[#03464D]"></div>
                <div>
                    <h1 className='text-[#03373D] text-4xl font-bold'>100% Safe Delivery</h1>
                    <p className='mt-5 text-gray-700 text-2xl font-bold'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>
            <div data-aos="fade-right" data-aos-delay="0" data-aos-duration="1000" className='p-5 bg-white flex gap-15 justify-center items-center rounded-3xl'>
                <img className="w-48 h-48" src={support} alt="parcel" />
                <div className="h-50 border-l-2 border-dashed border-[#03464D]"></div>
                <div>
                    <h1 className='text-[#03373D] text-4xl font-bold'>24/7 Call Center Support</h1>
                    <p className='mt-5 text-gray-700 text-2xl font-bold'>Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceIllustration;