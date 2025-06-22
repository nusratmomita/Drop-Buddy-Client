import React from 'react';

const HowItWorksCard = ({service}) => {
    const {icon: Icon , title , description} = service
    return (
        <div className='bg-white rounded-3xl p-10 space-y-4'>
            <div className='text-6xl text-[#03373D]'>
                <Icon />
            </div>
            <h1 className='text-3xl text-[#03373D] font-bold'>{title}</h1>
            <p className='text-2xl text-[#606060] font-semibold'>{description}</p>
        </div>
    );
};

export default HowItWorksCard;