import React from 'react';
import TeachSection from './TeachSection';
import BannerCarousel from './BannerCarousel';
import PartnerSlider from './PartnerSlider';
import PopularClasses from './PopularClasses';
import FeedbackCarousel from './FeedbackCarousel.jsx';
import StatsSection from './StatesSection.jsx';
import Ask from './Ask.jsx';

const Home = () => {
    return (
        <div>
            <BannerCarousel/>
            <PartnerSlider/>
                  <PopularClasses/>
                  <FeedbackCarousel/>
                  <StatsSection/>
       <TeachSection></TeachSection>
       <Ask></Ask>
        </div>
    );
};

export default Home;