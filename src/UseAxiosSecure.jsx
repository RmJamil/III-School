import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router'; // Fixed import path

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Request Interceptor
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(requestInterceptor);
  }, [user]);

  // Response Interceptor
  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          localStorage.removeItem('access-token');
          navigate('/login');
        } else if (status === 404) {
          console.warn('Not found:', error.response?.data?.message);
        } else if (status >= 500) {
          console.error('Server Error:', error.response?.data?.message || error.message);
        }

        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(responseInterceptor);
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
