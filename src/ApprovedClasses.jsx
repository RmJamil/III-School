import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router';
import UseAxiosSecure from './useAxiosSecure';
import Pagination from './Pagination'; // ✅ Adjust path if needed

const ApprovedClasses = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 3;

  const {
    data: classData = { classes: [], total: 0 },
    isLoading,
  } = useQuery({
    queryKey: ['approved-classes', page],
    queryFn: async () => {
      const res = await axiosSecure.get('/class/approved', {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleEnroll = (classItem) => {
    navigate(`/dashboard/classdetails/${classItem._id}`);
  };

  const { classes = [], total } = classData;

  return (
    <div className="lg:p-4 p-1">
      <div className='text-center text-3xl font-bold text-green-600'>
        <p>All Available classes are below <br/></p>
      <p> Enrole now !</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        
        {classes.map((classItem) => (
          <div key={classItem._id} className="card border border-green-500 bg-white shadow-xl rounded-2xl p-1 lg:p-4">
            <img
              src={classItem.image}
              alt={classItem.title}
              className="rounded-xl h-48 w-full object-cover"
            />
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-bold">{classItem.title}</h2>
              <p className="text-gray-600">Instructor: {classItem.name}</p>
              <p className="text-gray-700">Price: ${classItem.price}</p>
              <p className="text-gray-500 text-sm">{classItem.description?.slice(0, 80)}...</p>
              <p className="text-sm font-medium text-lime-600">
                Total Enrolled: {classItem.students?.length || 0}
              </p>

              <button
                onClick={() => handleEnroll(classItem)}
                className="btn mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                disabled={classItem.students?.includes(user?.email)}
              >
                {classItem.students?.includes(user?.email)
                  ? 'Already Enrolled'
                  : 'Enroll now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Below */}
      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={limit}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default ApprovedClasses;
