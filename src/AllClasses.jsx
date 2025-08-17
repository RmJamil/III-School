import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaForward } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import Pagination from './Pagination';

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { totalItems } = useLoaderData();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
        refetch();
      }
    });
  };

  const { data: paginatedClasses = [], isLoading, refetch } = useQuery({
    queryKey: ['classes', currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?page=${currentPage}&limit=${itemsPerPage}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading classes...</p>;

  return (
    <div className="lg:p-4  w-full lg:max-w-7xl mx-auto">
      <div className="text-center border p-4 rounded-2xl mb-6">
        <h2 className="text-2xl text-green-500 font-bold mb-2">All added Classes by teachers</h2>
        <h2 className="text-lg font-bold">Need review from admin</h2>
      </div>

      {/* TABLE VIEW for lg and up */}
      <div className="hidden lg:block w-full overflow-x-auto">
        <table className="table w-full border text-sm">
          <thead className="bg-white">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClasses.map((classItem, index) => (
              <tr key={classItem._id} className="lg:h-34">
                <td>{(index + 1) + (currentPage - 1) * itemsPerPage}</td>
                <td>{classItem.title}</td>
                <td>
                  <img
                    src={classItem.image || '/default-class.jpg'}
                    alt={classItem?.title}
                    className="w-20 h-14 rounded object-cover"
                  />
                </td>
                <td className="break-all max-w-[150px]">{classItem.email}</td>
                <td>
                  {classItem.description.length > 50
                    ? classItem.description.slice(0, 50) + '...'
                    : classItem.description}
                </td>
                <td>
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
                <td>
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() => handleStatusChange(classItem._id, 'accepted')}
                      disabled={classItem.status === 'accepted' || classItem.status === 'rejected'}
                      className="flex items-center border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
                      title="Approve"
                    >
                      <FaCheck className="mr-1" /> Approve
                    </button>

                    <button
                      onClick={() => handleStatusChange(classItem._id, 'rejected')}
                      disabled={classItem.status === 'accepted' || classItem.status === 'rejected'}
                      className="flex items-center border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                      title="Reject"
                    >
                      <FaTimes className="mr-1" /> Reject
                    </button>
                  </div>
                </td>
                <td>
                  <Link
                    to={classItem.status === 'accepted' && `/dashboard/classprogress/${classItem._id}`}
                  >
                    <button
                      className="flex items-center border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-sky-500 hover:text-white"
                      disabled={classItem.status !== 'accepted'}
                      title="Progress"
                    >
                      Progress <FaForward className="ml-1" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW for small and medium screens */}
      <div className="block lg:hidden space-y-4">
        {paginatedClasses.map((classItem) => (
          <div
            key={classItem._id}
            className="border rounded-lg p-4 shadow bg-white"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={classItem.image || '/default-class.jpg'}
                  alt={classItem?.title}
                  className="w-20 h-14 rounded object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Class Name : {classItem.title}</h3>
                <p className="text-sm text-gray-600 break-words max-w-xs">Added by : {classItem.email}</p>
                <p className="text-sm mt-1">
                 Descriptions :  {classItem.description.length > 80
                    ? classItem.description.slice(0, 80) + '...'
                    : classItem.description}
                </p>
                <span
                  className={`badge mt-2 ${
                    classItem.status === 'pending'
                      ? 'badge-warning'
                      : classItem.status === 'accepted'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}
                >
                  {classItem.status}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(classItem._id, 'accepted')}
                  disabled={classItem.status === 'accepted' || classItem.status === 'rejected'}
                  className="btn btn-sm btn-success flex items-center"
                  title="Approve"
                >
                  <FaCheck className="mr-1" /> Approve
                </button>
                <button
                  onClick={() => handleStatusChange(classItem._id, 'rejected')}
                  disabled={classItem.status === 'accepted' || classItem.status === 'rejected'}
                  className="btn btn-sm btn-error flex items-center"
                  title="Reject"
                >
                  <FaTimes className="mr-1" /> Reject
                </button>
              </div>
              <Link
                to={classItem.status === 'accepted' && `/dashboard/classprogress/${classItem._id}`}
              >
                <button
                  className="btn btn-sm btn-info flex items-center justify-center"
                  disabled={classItem.status !== 'accepted'}
                  title="Progress"
                >
                  Progress <FaForward className="ml-1" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllClasses;
