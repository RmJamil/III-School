import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';


const PendingTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, isError, error } = useQuery({
    queryKey: ['teacherRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-pending?status=pending');
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ requestId, userEmail }) => {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${requestId}`, { email: userEmail });
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
      text: `Email: ${email} Name: ${name}`,
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
      text: `Email: ${email} Name: ${name}`,
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

  if (isLoading)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="text-center border p-5 rounded-2xl font-bold mb-4">
        <h2 className="text-3xl text-green-500">Teacher Requests</h2>
        <p className="text-xl">Pending applications to be a teacher</p>
      </div>

      {isError && (
        <p className="text-red-500 text-center mb-4">Error: {error.message}</p>
      )}

      {!isLoading && requests.length === 0 && (
        <div className="bg-blue-100 my-8 h-[40vh] rounded-2xl flex justify-center items-center">
          <p className="text-orange-500 text-xl">
            No pending request found from any teacher.
          </p>
        </div>
      )}

      {/* TABLE VIEW - shown on large screens and up */}
      {requests.length > 0 && (
        <>
          <div className="hidden lg:block overflow-x-auto">
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
                {requests.map((req, idx) => (
                  <tr key={req._id}>
                    <td>{idx + 1}</td>
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
                          req.status === 'rejected' ? 'badge-error' : 'badge-warning'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleApprove(req._id, req.email, req.name)}
                        disabled={req.status === 'rejected'}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleReject(req._id, req.email, req.name)}
                        disabled={req.status === 'rejected'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARD VIEW - shown on small and medium screens */}
          <div className="lg:hidden space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="border rounded-lg p-4 shadow bg-white flex flex-col gap-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={req.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                    alt={req.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{req.name}</h3>
                    <p className="text-sm text-gray-600">{req.title}</p>
                    <p className="text-sm text-gray-600">{req.category}</p>
                  </div>
                </div>

                <p><strong>Experience:</strong> {req.experience}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`badge ${
                      req.status === 'rejected' ? 'badge-error' : 'badge-warning'
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                <div className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm flex-1"
                    onClick={() => handleApprove(req._id, req.email, req.name)}
                    disabled={req.status === 'rejected'}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error btn-sm flex-1"
                    onClick={() => handleReject(req._id, req.email, req.name)}
                    disabled={req.status === 'rejected'}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PendingTeacher;
