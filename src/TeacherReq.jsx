import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Pagination from './Pagination';
import Swal from 'sweetalert2';
import useAxiosSecure from './UseAxiosSecure';

const TeacherReq = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: { requests = [], total = 0 } = {},
    isLoading,
  } = useQuery({
    queryKey: ['teacherRequests', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ requestId, userEmail }) => {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${requestId}`, {
        email: userEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Successfully approved the teacher!',
        icon: 'success',
        timer: 1500,
      });
      queryClient.invalidateQueries(['teacherRequests']);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.patch(`/teacher-requests/reject/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Rejected the application for teacher!',
        icon: 'success',
        timer: 1500,
      });
      queryClient.invalidateQueries(['teacherRequests']);
    },
  });

  const handleApprove = (id, email, name) => {
    Swal.fire({
      title: 'Approve teacher?',
      text: `Email: ${email}\nName: ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve',
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate({ requestId: id, userEmail: email });
      }
    });
  };

  const handleReject = (id, email, name) => {
    Swal.fire({
      title: 'Reject teacher?',
      text: `Email: ${email}\nName: ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject',
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="text-center p-5 rounded-2xl font-bold mb-4 border">
        <h2 className="text-3xl text-green-500">Teacher Requests</h2>
        <p className="text-xl">Applications to be a teacher</p>
      </div>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => {
              const isFinal = req.status === 'accepted' || req.status === 'rejected';
              return (
                <tr key={req._id}>
                  <td>{(page - 1) * limit + idx + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={req.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                          alt={req.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{req.name}</td>
                  <td>{req.experience}</td>
                  <td>{req.title}</td>
                  <td>{req.category}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === 'pending'
                          ? 'badge-warning'
                          : req.status === 'accepted'
                          ? 'badge-success'
                          : 'badge-error'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleApprove(req._id, req.email, req.name)}
                      disabled={isFinal}
                      className="border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id, req.email, req.name)}
                      disabled={isFinal}
                      className="border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="md:hidden space-y-4">
        {requests.map((req) => {
          const isFinal = req.status === 'accepted' || req.status === 'rejected';
          return (
            <div key={req._id} className="border p-4 rounded-xl shadow">
              <div className="flex items-center gap-4 mb-2">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img
                      src={req.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                      alt={req.name}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">{req.name}</p>
                  <p className="text-sm ">{req.email}</p>
                </div>
              </div>
              <p><span className="font-medium">Experience:</span> {req.experience}</p>
              <p><span className="font-medium">Title:</span> {req.title}</p>
              <p><span className="font-medium">Category:</span> {req.category}</p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`badge ${
                    req.status === 'pending'
                      ? 'badge-warning'
                      : req.status === 'accepted'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}
                >
                  {req.status}
                </span>
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleApprove(req._id, req.email, req.name)}
                  disabled={isFinal}
                  className="border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req._id, req.email, req.name)}
                  disabled={isFinal}
                  className="border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TeacherReq;
