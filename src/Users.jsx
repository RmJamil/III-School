import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchEmail, setSearchEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Debounce onChange effect (optional, or skip for immediate search)
  useEffect(() => {
    const delay = setTimeout(() => {
      setSubmittedEmail(searchEmail.trim());
    }, 300); // debounce delay

    return () => clearTimeout(delay);
  }, [searchEmail]);

  // Fetch users (filtered on server)
  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users', submittedEmail],
    queryFn: async () => {
      const res = await axiosSecure.get('/findusers', {
        params: { email: submittedEmail },
      });
      return res.data;
    },
  });

  // Toggle admin mutation
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

  // Manual search button
  const handleSearch = () => {
    setSubmittedEmail(searchEmail.trim());
  };

  const handleClear = () => {
    setSearchEmail('');
    setSubmittedEmail('');
  };

  return (
    <div className="overflow-x-auto p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search Input & Buttons */}
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

      {/* Loading / Error */}
      {isLoading && <p className="text-center py-10">Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {/* No Match */}
      {!isLoading && submittedEmail && users.length === 0 && (
        <p className="text-red-500">No users found for "{submittedEmail}"</p>
      )}

      {/* Users Table */}
      {!isLoading && users.length > 0 && (
        <table className="table w-full border">
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
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>
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
    user.role === 'admin' ? 'btn-error cursor-not-allowed opacity-70' : 'btn-outline btn-primary'
  }`}
>
  {user.role === 'admin' ? 'Admin' : 'Make Admin'}
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

export default Users;
