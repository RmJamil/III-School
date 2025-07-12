import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentForm = () => {
    const {id}=useParams();
    console.log(id)
      const stripe = useStripe();
  const elements = useElements();

  const [error,setError]=useState('');
  const axiosSecure = UseAxiosSecure();
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

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
    } else {
        setError('');
      console.log('[PaymentMethod]', paymentMethod);
    }
  };


  const {
    data: classData={},
    isLoading,
  
  } = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
    enabled: !!id, // only run query if classId exists
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;


  return (
    <div>
          <form onSubmit={handleSubmit} className='w-1/2  p-4 m-4 bg-amber-200 mx-auto rounded-3xl'>
      <CardElement className='p-8  bg-white mx-auto border rounded-2xl my-2'
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
     <div className='w-1/2 mx-auto mt-2 '>
         <button className='btn  bg-green-500 w-full mx-auto rounded-xl' type="submit" disabled={!stripe}>
        Pay $ {classData.price}
      </button>
     </div>

     {
        error && <p className='text-2xl text-red-600 text-center mt-8'>{error}</p>
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