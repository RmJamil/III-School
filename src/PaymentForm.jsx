import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
const PaymentForm = () => {

    const {id}=useParams();
    console.log(id)
    const {user}=use(AuthContext)
    console.log(user?.displayName)
      const stripe = useStripe();
  const elements = useElements();
  const [alreadyPaid, setAlreadyPaid] = useState(true);
const[success,setSuccess]=useState('');
  const [error,setError]=useState('');

  const navigate=useNavigate();

  const[process,setProcess]=useState(false);
  const axiosSecure = UseAxiosSecure();

   const { data: classData={},isLoading,refetch} = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
    enabled: !!id, // only run query if classId exists
  });


    const amount=classData.price*100;
    const classId=classData._id;
    console.log(classData)

 useEffect(() => {
  if (user?.email && classId) {
    axiosSecure.post('/payments/validate', { email: user.email, classId }).then((res) => {
        setAlreadyPaid(res.data.exists);
      });
  }
}, [user?.email, classId,axiosSecure]);

console.log(alreadyPaid)

// if (res.data.exists) {
//   console.log('Payment record already exists');
// } else {
//   console.log('No payment found — proceed with payment');
// }


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
   setProcess(true);
    if (!stripe || !elements) {
   
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
      setProcess(false)
    } else {
        setError('');
      console.log('[PaymentMethod]', paymentMethod);
    }

    const res= await axiosSecure.post('/create-payment-intent',{
      amount,classId

    })

 const  handleReceipt=()=>{
 navigate('/dashboard/enrolled-classes');
 }


    const clientSecret=res.data.clientSecret;


    const result = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: elements.getElement(CardElement),
    billing_details:{
      name:user?.displayName,
      email:user?.email,
    },
  },
});
    console.log('res from intent',res );
if(result.error){
  console.log(result.error.message);
}
else{
  if(result.paymentIntent.status==='succeeded'){
    refetch();
    console.log('payment succeeded !');
    console.log(result)
     setProcess(false);
     setSuccess('You have successfully enrolled.');
    //payment history
          setAlreadyPaid(true)
     const paymentData = {
      classId,
      image:classData.image,
      title:classData.title,
      name:user?.displayName,
      email:user?.email,
      transactionId:result.paymentIntent.id,
      amount,
      createdAt: new Date(),
      method: 'card', // or 'sslcommerz', etc.
      status:'paid'
    };
    console.log(paymentData);
  const res = await axiosSecure.post('/payments', paymentData);
       if (res.data.insertedId) {
   
      Swal.fire({
        icon:'success',
        title:'payment successful',
        html:`<strong>Transection ID:</strong> <code>${result.paymentIntent.id}</code>`,
        confirmButtonText: 'Downhload payment details',
      }).then((result) => {
      if (result.isConfirmed) {
        handleReceipt(); // ✅ Only runs when user clicks "OK"
      }
    });
   
     
      // Optional: redirect to dashboard or show receipt
    } else {
  setProcess(false);
      Swal.fire('Warning', 'Duplicate payment or error.', 'warning');
    }

    const add = await axiosSecure.patch(`/class/enroll/${id}`, {
        email: user?.email,
      });

      if (add.data.modifiedCount > 0) {
       setSuccess('You have successfully enrolled.');
    
      }

  }
}

  };


 

  if (isLoading) return <p className="text-center py-10">Loading...</p>;


  return (
    <div>
          <form onSubmit={handleSubmit} className='w-1/2  p-4 m-4 bg-amber-200 mx-auto rounded-3xl'>
      <CardElement className='p-8  bg-white mx-auto border rounded-2xl my-2' onChange={()=>setError("")}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />


<div className='w-1/2 mx-auto mt-2'>
  <button disabled={alreadyPaid} className={`btn   bg-green-500 w-full mx-auto rounded-xl  ${process ? 'btn-disabled' : 'btn-primary' }`}type="submit">
  {process ? 'Processing...' : alreadyPaid ? 'Paid ✔️' : `Pay $${amount}`}
</button>
</div>

     {
        error && <p className='text-2xl text-red-600 text-center mt-8'>{error}</p>
     }
     {
      success && <p className='text-2xl text-green-600 text-center mt-8'>{success}</p>
     }
    </form>
    <div>
            <div className="w-1/4 mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">{classData.title}</h2>

      <img src={classData.image} alt={classData.title} className="w-full max-h-80 object-cover rounded" />

      <div>
        <p><strong>Teacher:</strong> {classData.name} ({classData.email})</p>
        <p><strong>Price:</strong> ${classData.price}</p>
     
        <p><strong>Description:</strong></p>
        <p>{classData.description}</p>
      </div>
    </div>
    </div>

    </div>
  


  );

};

export default PaymentForm;