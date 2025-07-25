import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import useAxiosSecure from './useAxiosSecure';

const PopularClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading, isError } = useQuery({
    queryKey: ['popular-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes/popular');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load popular classes.</p>;

  return (
    <div className="py-10 bg-blue-50 my-12 px-4">
      <div className=" mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-green-500 font-bold text-center mb-8">
          🔥 Popular Classes
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
          allowTouchMove={false}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="ticker-swiper"
        >
          {classes.map((cls) => (
            <SwiperSlide key={cls._id}>
              <div className="bg-white p-4 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-48 rounded-2xl object-cover"
                />
                <div className="p-4 flex-grow flex flex-col text-sm">
                  <p className="mb-1">
                    <span className="font-bold">Class Title:</span> {cls.title}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-bold">Description:</span> {cls.description?.slice(0, 80)}...
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-bold">Instructor:</span> {cls.name}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-bold">Enrolled:</span> {cls.enrolled || 0}
                  </p>
                  <p className="text-lg font-bold text-green-500 mt-2">
                    Fees: ${cls.price}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularClasses;
