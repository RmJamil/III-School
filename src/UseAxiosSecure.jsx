import axios from 'axios';
import React, { use, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router';

const axiosSecure=axios.create({
    baseURL:`http://localhost:3000`
})

const UseAxiosSecure = () => {

     const navigate = useNavigate();
    const {user}=use(AuthContext);
    axiosSecure.interceptors.request.use(
        config=>{
            config.headers.authorization=`Bearer ${user.accessToken}`
        }
    )


      useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

 
        if (status === 403) {
       
         
          navigate('/forbidden');
        } 
        else if(status===401){
                localStorage.removeItem('access-token');
          navigate('/login');
        }
        else if (status >= 500) {
          console.error('Server Error:', error.response?.data?.message || error.message);
    
        } else if (status === 404) {
          console.warn('Not found:', error.response?.data?.message);
        }

        return Promise.reject(error); 
      }
    );

 
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
    return axiosSecure;
    

};

export default UseAxiosSecure;