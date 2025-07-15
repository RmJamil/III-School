import React from 'react';
import TeachSection from './TeachSection';
import BannerCarousel from './BannerCarousel';
import PartnerSlider from './PartnerSlider';

const Home = () => {
    return (
        <div>
            <BannerCarousel/>
            <PartnerSlider/>
       <TeachSection></TeachSection>
        </div>
    );
};

export default Home;