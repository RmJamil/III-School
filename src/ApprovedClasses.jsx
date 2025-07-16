import { useQuery } from '@tanstack/react-query';

import { useContext} from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import UseAxiosSecure from './useAxiosSecure';
import { Link, useNavigate } from 'react-router';

const ApprovedClasses = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();
  // const [alreadyPaid, setAlreadyPaid] = useState(true);
  const { data: classes = [] } = useQuery({
    queryKey: ['approved-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/class/approved');
      return res.data;
    },
  });
  //  useEffect(() => {
  //   if (user?.email && classId) {
  //     axiosSecure.post('/payments/validate', { email: user.email, classId }).then((res) => {
  //         setAlreadyPaid(res.data.exists);
  //       });
  //   }
  // }, [user?.email, classId,axiosSecure]);
  
  // console.log(alreadyPaid)
  


  const handleEnroll = async (classItem) => {
    navigate(`/dashboard/classdetails/${classItem._id}`)
    // try {
    //   const res = await axiosSecure.patch(`/class/enroll/${classItem._id}`, {
    //     email: user?.email,
    //   });

    //   if (res.data.modifiedCount > 0) {
    //     Swal.fire('Enrolled!', 'You have successfully enrolled.', 'success');
    //     refetch(); // update UI
    //   }
    // } catch (err) {
    //   Swal.fire('Oops!', err?.response?.data?.message || 'Something went wrong', 'error');
    // }
    // console.log(classes)

    // try {
    //       const res = await axiosSecure.post('/enrolledclasses', classItem);
    //       if (res.data.insertedId) {
    //         Swal.fire('Success', 'student enrolled!', 'success');
    //         // setIsModalOpen(false);
    //         // reset();
    //       }
    //     } catch (err) {
    //       Swal.fire('Error', 'Failed to enroll', err);
    //     }
      };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {classes.map((classItem) => (
        <div key={classItem._id} className="card border border-green-500 bg-white shadow-xl rounded-2xl p-4">
          <img src={classItem.image} alt={classItem.title} className="rounded-xl h-48 w-full object-cover" />
          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-bold">{classItem.title}</h2>
            <p className="text-gray-600">Instructor: {classItem.name}</p>
            <p className="text-gray-700">Price: ${classItem.price}</p>
            <p className="text-gray-500 text-sm">{classItem.description?.slice(0, 80)}...</p>
            <p className="text-sm font-medium text-lime-600">Total Enrolled: {classItem.students?.length || 0}</p>
   
            <button
              onClick={() => handleEnroll(classItem)}
              className=" btn mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
              disabled={classItem.students?.includes(user?.email)}
            >
              {classItem.students?.includes(user?.email) ? 'Already Enrolled' : 'Enroll now'}
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovedClasses;
