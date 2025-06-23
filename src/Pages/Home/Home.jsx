import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import SuccessWell from '../../Components/SuccessWell/SuccessWell';



const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <SuccessWell></SuccessWell>
        </div>
    );
};

export default Home;