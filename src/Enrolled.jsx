import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';

import { FaArrowRight, FaDownload } from 'react-icons/fa';
import UseAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router';

const Enrolled = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const navigate=useNavigate();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/by-email?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // const handleDownload = async (transactionId) => {
  //   try {
  //     const res = await axiosSecure.get(`/payments/download/${transactionId}`, {
  //       responseType: 'blob',
  //     });

  //     const blob = new Blob([res.data], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `receipt-${transactionId}.pdf`;
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error('Download error:', error);
  //   }
  // };

  const handleDownload = async (transactionId) => {
  try {
    const res = await axiosSecure.get(`/payments/download/${transactionId}`, {
      responseType: 'blob',
    });

    const blob = new Blob([res.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // ✅ Open in new tab instead of downloading
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error opening receipt:', error);
  }
};

const handleContinue=(id)=>{
  navigate(`/dashboard/payments/myenrolled/${id}`)
}


  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
   <div>
    <h1 className='text-center text-4xl font-bold text-green-500'>Your enrolled classes</h1>
    { payments.length!=0?
      (<>
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {payments.map((payment) => (
        <div key={payment.transactionId} className="card bg-base-100 shadow-xl p-4 border">
          <div className="card-body">
            <img src={payment.image} alt="" />
            <h2 className="card-title">Class Name:<span className='text-green-600'>{payment.title}</span> </h2>
            <h2 ><span className="text-lg font-bold">Teacher-name:</span> <span className='text-xl text-green-600'>{payment.teacher}</span></h2>
            <p><strong>Price:</strong> ${payment.amount}</p>
            <p><strong>Transaction:</strong> {payment.transactionId}</p>
            <p><strong>Enrolled date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
            <button
              onClick={() => handleDownload(payment.transactionId)}
              className="btn btn-outline btn-primary mt-4 flex items-center gap-2"
            >
              <FaDownload /> Download Receipt
            </button>
            <button
  onClick={()=>handleContinue(payment.classId)}
  className="btn btn-outline btn-success mt-4 flex items-center gap-2"
>
  <FaArrowRight /> Continue
</button>
          </div>
        </div>
      ))}
    </div>
      </>):
      (
       <div className='flex justify-center items-center bg-blue-100 my-4 rounded-2xl h-[60vh]'>
         <p className='text-center text-3xl font-bold text-orange-500'>You have not enrolled any class yet</p>
       </div>
      )
    }
   </div>
  );
};

export default Enrolled;
