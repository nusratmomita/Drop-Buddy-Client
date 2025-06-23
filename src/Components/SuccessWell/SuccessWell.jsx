import React from 'react';
import Marquee from 'react-fast-marquee';
import brand1 from '../../assets/brands/amazon.png'
import brand2 from '../../assets/brands/amazon_vector.png'
import brand3 from '../../assets/brands/casio.png'
import brand4 from '../../assets/brands/moonstar.png'
import brand5 from '../../assets/brands/randstad.png'
import brand6 from '../../assets/brands/start-people 1.png'
import brand7 from '../../assets/brands/start.png'

const SuccessWell = () => {
    return (
        <div>
            <h1 className='text-[#03373D] text-5xl font-bold text-center'>We've helped thousands of sales teams</h1>

            <Marquee pauseOnHover speed={50} gradient={false} className='mt-20 mb-20'>       
                <img className="h-10 object-contain" src={brand1} alt="amazon" />
                <img className="h-10 ml-15 object-contain" src={brand2} alt="amazon_vector" />
                <img className="h-10 ml-15 object-contain" src={brand3} alt="casio" />
                <img className="h-10 ml-15 object-contain" src={brand4} alt="monster" />
                <img className="h-10 ml-15 object-contain" src={brand5} alt="randstad" />
                <img className="h-10 ml-15 object-contain" src={brand6} alt="start-people 1" />
                <img className="h-10 ml-15 object-contain" src={brand7} alt="start" />
            </Marquee>
            {/* <hr class="h-px my-10 bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
            <div className="mt-2 border-t-2 border-dashed border-[#03464D] mb-10"></div>
        </div>
    );
};

export default SuccessWell;