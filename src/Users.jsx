import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Pagination from './Pagination';
import useAxiosSecure from './UseAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchEmail, setSearchEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    const delay = setTimeout(() => {
      setSubmittedEmail(searchEmail.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchEmail]);

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
    <div className="lg:p-4 lg:w-3/4 w-full mx-auto">
      {/* Search */}
      <div className="flex justify-end">
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 w-full sm:max-w-xl">
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by name/email"
            className="input input-bordered w-full"
          />
          <div className="flex gap-2">
            <button
              className="btn bg-green-500 hover:bg-green-600 hover:text-white border-none"
              onClick={handleSearch}
            >
              Search
            </button>
            {(searchEmail || submittedEmail) && (
              <button
                className="btn bg-green-500 hover:bg-green-600 hover:text-white border-none"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center lg:p-3 bg-blue-100 text-2xl mt-6 text-green-500 font-bold">
        All Users
      </div>

      {/* Loading & Errors */}
      {isLoading && <p className="text-center py-10">Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {!isLoading && submittedEmail && users.length === 0 && (
        <p className="text-red-500">No users found for "{submittedEmail}"</p>
      )}

      {/* Table for Desktop */}
      {!isLoading && users.length > 0 && (
        <>
        <div className=' hidden lg:table'>
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
                          : 'btn-outline bg-green-500 hover:bg-green-600 hover:text-white border-none'
                      }`}
                    >
                      {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {/* Card layout for Mobile */}
          <div className="md:hidden space-y-4 my-8">
            {users.map((user) => (
              <div key={user._id} className="border p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <img
                        src={user.photo || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{user.name || 'N/A'}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="capitalize text-sm font-medium mt-1">
                      Role: {user.role || 'student'}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleToggleAdmin(user.email)}
                    disabled={user.role === 'admin'}
                    className={`btn btn-sm w-full mt-2 ${
                      user.role === 'admin'
                        ? 'btn-error cursor-not-allowed opacity-70'
                        : 'btn-outline bg-green-500 hover:bg-green-600 hover:text-white border-none'
                    }`}
                  >
                    {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
      <div>
            <Pagination
            currentPage={page}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={(newPage) => setPage(newPage)}
          />
      </div>
        </>
      )}
    </div>
  );
};

export default Users;
