import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  'https://i.postimg.cc/sxqp93nr/vvt.jpg',
  'https://i.postimg.cc/sXx0DDqP/se.webp',
  'https://i.postimg.cc/sxVxZqPJ/mmm.jpg',
  'https://i.postimg.cc/RCsGZBLG/ai.webp',
  'https://i.postimg.cc/yYj62LmM/pp.jpg',
  'https://i.postimg.cc/02FX5s0D/ap.jpg'
];

const ImageCarousel = () => {
  return (
    <div className="bg-blue-50 rounded-2xl p-3 sm:p-6">
      <h1 className="text-2xl sm:text-4xl text-center text-green-500 font-bold mt-6 sm:mt-12">
        Coming Soon...
      </h1>

      <div className="w-full max-w-6xl mx-auto py-6 sm:py-8 px-2 sm:px-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-52 sm:h-64 md:h-72 object-cover rounded-xl shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageCarousel;
