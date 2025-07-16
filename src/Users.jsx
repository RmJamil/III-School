import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import Pagination from './Pagination'; // ✅ Adjust path if needed

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchEmail, setSearchEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [page, setPage] = useState(1);
  const limit = 4;

  // Debounce onChange effect
  useEffect(() => {
    const delay = setTimeout(() => {
      setSubmittedEmail(searchEmail.trim());
      setPage(1); // Reset to first page when new search is submitted
    }, 300);

    return () => clearTimeout(delay);
  }, [searchEmail]);

  // Fetch users
  const {
    data: { users = [], total = 0 } = {},
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['users', submittedEmail, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/findusers', {
        params: { email: submittedEmail, page, limit }
      });
      return res.data;
    },
  });

  // Admin toggle
  const toggleAdminMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/users/admin/${email}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const handleToggleAdmin = (email) => {
    toggleAdminMutation.mutate(email);
  };

  const handleSearch = () => {
    setSubmittedEmail(searchEmail.trim());
    setPage(1);
  };

  const handleClear = () => {
    setSearchEmail('');
    setSubmittedEmail('');
    setPage(1);
  };

  return (
    <div className="overflow-x-auto p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4 max-w-xl">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Search by name/email"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        {(searchEmail || submittedEmail) && (
          <button className="btn btn-outline" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {/* Loading & Errors */}
      {isLoading && <p className="text-center py-10">Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {!isLoading && submittedEmail && users.length === 0 && (
        <p className="text-red-500">No users found for "{submittedEmail}"</p>
      )}

      {/* Table */}
      {!isLoading && users.length > 0 && (
        <>
          <table className="table w-full border my-12">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="hover">
                  <td>{(page - 1) * limit + idx + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={user.photo || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td className="capitalize">{user.role || 'student'}</td>
                  <td>
                    <button
                      onClick={() => handleToggleAdmin(user.email)}
                      disabled={user.role === 'admin'}
                      className={`btn btn-sm ${
                        user.role === 'admin'
                          ? 'btn-error cursor-not-allowed opacity-70'
                          : 'btn-outline btn-primary'
                      }`}
                    >
                      {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Pagination Section */}
          <Pagination
            currentPage={page}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
};

export default Users;
