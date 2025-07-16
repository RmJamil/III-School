import { Navigate, useLocation } from 'react-router';

import { useContext } from 'react';

import useUserRole from './useUserRole';
import { AuthContext } from './AuthProvider';

const TeacherRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (user && role === 'teacher') {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location.pathName }} replace />;
};

export default TeacherRoute;
