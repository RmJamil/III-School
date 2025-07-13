import { useParams } from 'react-router';
import useAxiosSecure from './useAxiosSecure';
import { FaDownload } from 'react-icons/fa';

const DownloadPaymentDetails = () => {
    const data=useParams();
   const transactionId=data.transactionId;
    console.log(data.transactionId)
  const axiosSecure = useAxiosSecure();

  const handleDownload = async () => {
    try {
      const res = await axiosSecure.get(`/payments/download/${transactionId}`, {
        responseType: 'blob', // needed to download file
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `payment-${transactionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <button onClick={()=>handleDownload()} className="btn btn-outline btn-success flex gap-2 items-center">
      <FaDownload />
      Download Receipt
    </button>
  );
};

export default DownloadPaymentDetails;
