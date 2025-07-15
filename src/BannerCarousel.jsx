// BannerCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BannerCarousel = () => {
  const slides = [
    "https://i.postimg.cc/1Xpcfzb8/bbh4.avif",
    "https://i.postimg.cc/WzrSg8qb/bbg.png",
    "https://i.postimg.cc/zXnYrZXv/bb2.avif",
  ];

  return (
    <div className="max-w-full bg-blue-50 py-12 my-6 mx-auto rounded-lg overflow-hidden shadow-lg">
       <h1 className='text-center text-5xl font-bold text-green-500'>Learning has no limit</h1>
        <h1 className='text-center text-5xl font-bold text-orange-500 mb-8'>We set our limit to infinity</h1>
        
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-[300px] md:h-[500px]"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
