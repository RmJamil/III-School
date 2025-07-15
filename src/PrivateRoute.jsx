import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';

const PrivateRoute = ({children}) => {

    const location=useLocation();

    const{user,loading}=use(AuthContext);

    if(loading){
        return <div className='flex justify-center items-center h-[70vh]'>
<span className="loading loading-bars text-success loading-xl"></span>
        </div>
    }

    if(user && user?.email){
        return children;
    }
    else{

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
return <Navigate state={location.pathname} to='/login'></Navigate>;


    }
    
    
 
};

export default PrivateRoute;