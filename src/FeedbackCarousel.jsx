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
    <section className="py-12 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">💬 What Students Say About Teachers</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {ratings.map((rating) => (
            <SwiperSlide key={rating._id}>
              <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center">
                <div className="flex flex-col items-center">
                  <img
                    src={rating.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                    alt={rating.user_name}
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold"> <span className='font-bold'>Name:</span> {rating.user_name}</h3>
                   <p className="text-gray-700 text-sm italic"> <span className='font-bold'>Feedback: </span> "{rating.description}"</p>
                  <p className="text-sm italic text-gray-500 mb-2"> <span className='font-bold'>Class title: </span> {rating.className}</p>
                  <Rating
                    initialRating={rating.rating}
                    readonly
                    emptySymbol={<FaRegStar className="text-yellow-400" />}
                    fullSymbol={<FaStar className="text-yellow-500" />}
                    className="mb-3"
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
