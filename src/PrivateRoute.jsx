import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';


const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext); // ✅ fixed here

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[70vh]'>
        <span className="loading loading-bars text-success loading-xl"></span>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  } 
  if(!user) {
    Swal.fire({
      title: "Log in first to get access 🔒",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
