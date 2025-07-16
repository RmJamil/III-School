import React from 'react';
import TeachSection from './TeachSection';
import BannerCarousel from './BannerCarousel';
import PartnerSlider from './PartnerSlider';
import PopularClasses from './PopularClasses';
import FeedbackCarousel from './FeedbackCarousel.jsx';
import StatsSection from './StatesSection.jsx';
import Ask from './Ask.jsx';
import ImageCarousel from './ImageCarousel.jsx';

const Home = () => {
    return (
        <div>
            <BannerCarousel/>
            <PartnerSlider/>
                  <PopularClasses/>
                  <FeedbackCarousel/>
                  <StatsSection/>
                  <ImageCarousel></ImageCarousel>
       <TeachSection></TeachSection>
       <Ask></Ask>
        </div>
    );
};

export default Home;