import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import Pagination from './Pagination'; // ✅ Make sure this path is correct

const TeacherReq = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const limit = 5; // Items per page

  // Fetch paginated teacher requests
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

  // Approve request + update user role
  const approveMutation = useMutation({
    mutationFn: async ({ requestId, userEmail }) => {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${requestId}`, {
        email: userEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['teacherRequests']);
    },
  });

  // Reject request
  const rejectMutation = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.patch(`/teacher-requests/reject/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['teacherRequests']);
    },
  });

  const handleApprove = (id, email) => {
    approveMutation.mutate({ requestId: id, userEmail: email });
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>

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
                      <img src={req.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'} alt={req.name} />
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
                    onClick={() => handleApprove(req._id, req.email)}
                    disabled={isFinal}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    disabled={isFinal}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ✅ External Pagination Component */}
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
