import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import UseAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';

const ClassDetails = () => {
    const classdetails=useLoaderData();
    const classId=classdetails._id;
    console.log(classId);
    const {user}=use(AuthContext);
     const navigate=useNavigate();
    const axiosSecure = UseAxiosSecure();

const { data: hasPaid = false, isLoading } = useQuery({
  queryKey: ['payment-status', classId, user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/payments/status?classId=${classId}&userEmail=${user.email}`);
    return res.data.paid; // true or false
  },
  enabled: !!classId && !!user?.email,
});

const handlePay=(classId)=>{
    navigate(`/dashboard/payment/${classId}`);
}
    return (
        <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          <div key={classdetails._id} className="card  shadow-xl border">
            <figure>
              <img src={classdetails.image} alt={classdetails.title} className="h-52 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{classdetails.title}</h3>
              <p><strong>Name:</strong> {classdetails.name}</p>
              <p><strong>Email:</strong> {classdetails.email}</p>
              <p><strong>Price:</strong> ${classdetails.price}</p>
              <p><strong>Description:</strong> {classdetails.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge ${
                  classdetails.status === 'pending' ? 'badge-warning' :
                  classdetails.status === 'accepted' ? 'badge-success' :
                  'badge-error'
                }`}>
                  {classdetails.status}
                </span>
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
            
  

               <button
               onClick={()=>handlePay(classId)}
  className="btn mt-2 border border-green-500  px-4 py-2 rounded hover:bg-green-500 hover:text-white transition"
  disabled={hasPaid || isLoading}
>
  {hasPaid ? 'Already Paid' : 'Pay Now'}
</button>
              </div>
            </div>
          </div>

      </div>
        </div>
    );
};

export default ClassDetails;