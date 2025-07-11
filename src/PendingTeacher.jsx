import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useParams } from 'react-router';

const PendingTeacher = () => {
  
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all teacher requests (pending or rejected)
  const { data: requests = [], isLoading,isError,error } = useQuery({
    queryKey: ['teacherRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-pending?status=pending');
      return res.data;
    },
  });

  // Approve mutation (update status and user role)
  const approveMutation = useMutation({
    mutationFn: async ({ requestId, userEmail }) => {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${requestId}`, { email: userEmail });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['teacherRequests']);
    },
  });

  // Reject mutation (update status only)
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

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>

 {/* Loading / Error */}
      {isLoading && <p className="text-center py-10">Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {/* No Match */}
      {!isLoading  && requests.length === 0 && (
        <p className="text-red-500">No pending request found from any teacher. </p>
      )}

 {!isLoading && requests.length > 0 &&(
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
                    <img src={req.image || 'https://i.ibb.co/2FsfXqM/default-avatar.png'} alt={req.name} />
                  </div>
                </div>
              </td>
              <td>{req.name}</td>
              <td>{req.experience}</td>
              <td>{req.title}</td>
              <td>{req.category}</td>
              <td>
                <span className={`badge ${req.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                  {req.status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleApprove(req._id, req.email)}
                  disabled={req.status === 'rejected'}
                >
                  Approve
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleReject(req._id)}
                  disabled={req.status === 'rejected'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 )}
    </div>
  );
};

export default PendingTeacher;
