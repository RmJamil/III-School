import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';

import { FaDownload } from 'react-icons/fa';
import UseAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';

const Enrolled = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/by-email?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDownload = async (transactionId) => {
    try {
      const res = await axiosSecure.get(`/payments/download/${transactionId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${transactionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {payments.map((payment) => (
        <div key={payment.transactionId} className="card bg-base-100 shadow-xl p-4 border">
          <div className="card-body">
            <img src={payment.image} alt="" />
            <h2 className="card-title">{payment.className}</h2>
            <p><strong>Price:</strong> ${payment.amount}</p>
            <p><strong>Transaction:</strong> {payment.transactionId}</p>
            <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
            <button
              onClick={() => handleDownload(payment.transactionId)}
              className="btn btn-outline btn-primary mt-4 flex items-center gap-2"
            >
              <FaDownload /> Download Receipt
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Enrolled;
