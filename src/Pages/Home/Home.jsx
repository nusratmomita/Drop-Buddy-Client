import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import SuccessWell from '../../Components/SuccessWell/SuccessWell';
import ServiceIllustration from '../../Components/ServiceIllustration/ServiceIllustration';
import MerchantIntro from '../../Components/MerchantIntro/MerchantIntro';



const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <SuccessWell></SuccessWell>
            <ServiceIllustration></ServiceIllustration>
            <MerchantIntro></MerchantIntro>
        </div>
    );
};

export default Home;