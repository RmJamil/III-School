import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import UseAxiosSecure from './useAxiosSecure';


const MyProfile = () => {
  const { user } = useContext(AuthContext); // current logged-in user
  const axiosSecure = UseAxiosSecure();
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['user-info', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
 console.log(userInfo)
  if (isLoading) return <p className="text-center">Loading...</p>;

  const { name, email, photo, role, phone } = userInfo;

  return (
    <div>
      <p className='text-3xl text-center font-bold text-orange-500'>{name}'s Profile</p>
      <div className="max-w-md mx-auto p-6 border-2 border-green-500 rounded-xl shadow-md space-y-4 mt-10">
      <div className="flex items-center space-x-4">
        <img
          src={photo || '/default-user.png'}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-bold">{name || 'No Name'}</h2>
          <p className="text-sm  capitalize"> Role: {role || 'user'}</p>
        </div>
      </div>

      <div className=" mt-4 space-y-2">
        <p><span className="text-xl font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Phone:</span> {phone || 'N/A'}</p>
      </div>
    </div>
    </div>
  );
};

export default MyProfile;
