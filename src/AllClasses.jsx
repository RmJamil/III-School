import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaForward } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import Pagination from './Pagination';

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
// const totalItems=useLoaderData();
// console.log(totalItems)
 const { totalItems } = useLoaderData();
  //  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

const[data,setData]=useState();


console.log(totalItems)


 
  // Fetch all classes
  // const { data: classes = []} = useQuery({
  //   queryKey: ['all-classes'],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get('/classes');
  //     return res.data;
  //   },
  // });

  // Approve or reject mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/classes/status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-classes']);
    },
  });

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure to ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, status });
        Swal.fire('Updated!', `Class marked as ${status}.`, 'success');
          refetch()
      }
      
    });
 
  };

const { data: paginatedClasses = [], isLoading, refetch } = useQuery({
  queryKey: ['classes', currentPage],
  queryFn: async () => {
    const res = await axiosSecure.get(`/classes?page=${currentPage}&limit=${itemsPerPage}`);
    return res.data;
  }
});


  if (isLoading) return <p className="text-center py-10">Loading classes...</p>;

  return (
    <div className="p-6 overflow-x-auto max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Classes</h2>
      <table className="table w-full border">
        <thead className="">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            <th className='text-center'>Actions</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClasses?.map((classItem, index) => (
            <tr key={classItem._id} className=' lg:h-34'>
              <td>  {(index + 1) + (currentPage - 1) * itemsPerPage}</td>
              <td>{classItem.title}</td>
              <td>
                <img
                  src={classItem.image || '/default-class.jpg'}
                  alt={classItem?.title}
                  className="w-12 lg:w-24 lg:h-16 h-9 rounded object-cover"
                />
              </td>
              <td>{classItem.email}</td>
              <td>
                {classItem.description.length > 50
                  ? classItem.description.slice(0, 50) + '...'
                  : classItem.description}
              </td>
              <td className=''>
                <span
                  className={`badge ${
                    classItem.status === 'pending'
                      ? 'badge-warning'
                      : classItem.status === 'accepted'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}
                >
                  {classItem.status}
                </span>
              </td>
              <td className="flex gap-2 justify-center items-center  lg:my-12 ">
               <div className=' flex gap-2'>
                 <button
                  onClick={() => handleStatusChange(classItem._id, 'accepted')}
                  disabled={classItem.status === 'accepted' || classItem.status === 'rejected'}
                  className="btn btn-sm btn-success"
                  title="Approve"
                >
                  <FaCheck />
                  Approve
                </button>

                <button
                  onClick={() => handleStatusChange(classItem._id, 'rejected')}
                  disabled={classItem.status === 'accepted' || classItem.status === 'rejected'}
                  className="btn btn-sm btn-error"
                  title="Reject"
                >
                  <FaTimes />
                  Reject
                </button>
               </div>
              </td>
              <td>
       <Link to={classItem.status == 'accepted' && `/dashboard/classprogress/${classItem._id}`}>
                <button
                  className="btn btn-info"
                  disabled={classItem.status !== 'accepted'}
                  title="Progress"
                >
                    Progress
                  <FaForward />
                </button>
       </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllClasses;
