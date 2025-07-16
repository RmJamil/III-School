// ImageCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  'https://i.postimg.cc/CL1VtScg/of.jpg',
  'https://i.postimg.cc/g2j8nX4T/graphic-design.jpg',
  'https://via.placeholder.com/300x200?text=Image+3',
  'https://via.placeholder.com/300x200?text=Image+4',
  'https://via.placeholder.com/300x200?text=Image+5',
  'https://via.placeholder.com/300x200?text=Image+6'
];

const ImageCarousel = () => {
  return (
   <div>
    <h1 className='text-4xl text-center text-green-500 font-bold my-12'>Comming soon . . .</h1>
     <div className="max-w-7xl mx-auto py-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </div>
  );
};

export default ImageCarousel;
