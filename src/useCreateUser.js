import { useMutation } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';


const useCreateUser = () => {
  const axiosSecure = UseAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axiosSecure.post('/users', userData);
      return response.data;
    },
  });

  return mutation;
};

export default useCreateUser;
