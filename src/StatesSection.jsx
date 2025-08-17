import { useQuery } from '@tanstack/react-query';

import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import CountUp from 'react-countup';
import useAxiosSecure from './useAxiosSecure';

const StatsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['stats-summary'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stats/summary');
      return res.data;
    }
  });

  const { totalUsers = 0, totalClasses = 0, totalEnrollment = 0 } = data;

  if (isLoading) return <p className="text-center py-10">Loading statistics...</p>;

  return (
 
 
      <section className=" my-12 rounded-2xl py-8">
           <h1 className='text-center text-5xl font-bold text-green-500 my-4 mb-16'>Statistics</h1>
        <div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
        
        {/* Left: Stats Cards */}
        <div className="grid grid-cols-1 gap-6 w-full md:w-1/2">
          {/* Total Users */}
          <div className=" shadow-lg p-6 rounded-lg flex items-center gap-4">
            <FaUsers className="text-4xl text-blue-500" />
            <div>
              <p className="text-lg font-bold">Total Users</p>
              <p className="text-2xl font-bold text-blue-700">
                <CountUp end={totalUsers} duration={4} />
              </p>
            </div>
          </div>

          {/* Total Classes */}
          <div className=" shadow-lg p-6 rounded-lg flex items-center gap-4">
            <FaChalkboardTeacher className="text-4xl text-green-500" />
            <div>
              <p className="text-lg font-bold">Total Classes</p>
              <p className="text-2xl font-bold text-green-700">
                <CountUp end={totalClasses} duration={5} />
              </p>
            </div>
          </div>

          {/* Total Enrolled */}
          <div className=" shadow-lg p-6 rounded-lg flex items-center gap-4">
            <FaUserGraduate className="text-4xl text-purple-500" />
            <div>
              <p className="text-lg font-bold">Total Enrollment</p>
              <p className="text-2xl font-bold text-purple-700">
                <CountUp end={totalEnrollment} duration={6} />
              </p>
            </div>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2">
          <img
            src="https://i.postimg.cc/jjzyJb6m/rrr.jpg"
            alt="Dashboard Stats"
            className="w-full max-h-[300px] object-contain"
          />
        </div>
      </div>
        </div>
      
    </section>

  );
};

export default StatsSection;
