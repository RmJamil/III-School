import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useAxiosSecure from './useAxiosSecure';

const FeedbackCarousel = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ratings = [], isLoading, isError } = useQuery({
    queryKey: ['ratings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/ratings');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading feedback...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load feedback.</p>;

  return (
    <section className="py-10  rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-green-500 font-bold text-center mb-8">
          💬 What Students Say About Teachers
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {ratings.map((rating) => (
            <SwiperSlide key={rating._id}>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-auto text-center h-full">
                <div className="flex flex-col items-center">
                  <img
                    src={rating.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                    alt={rating.user_name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">
                    <span className="font-bold">Name:</span> {rating.user_name}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm italic mb-1">
                    <span className="font-bold">Feedback: </span>"{rating.description}"
                  </p>
                  <p className="text-xs sm:text-sm italic text-gray-500 mb-2">
                    <span className="font-bold">Class:</span> {rating.className}
                  </p>
                  <Rating
                    initialRating={rating.rating}
                    readonly
                    emptySymbol={<FaRegStar className="text-yellow-400" />}
                    fullSymbol={<FaStar className="text-yellow-500" />}
                    className="mb-2"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
