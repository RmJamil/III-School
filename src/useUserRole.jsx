// src/hooks/useUserRole.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
 // update this if your context path differs

const useUserRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data?.role; // e.g., 'admin', 'teacher', 'student'
    },
    enabled: !loading && !!user?.email,
  });

  return { role, isRoleLoading: isLoading, isRoleError: isError };
};

export default useUserRole;
