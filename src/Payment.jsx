import React from 'react';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise=loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
const Payment = () => {
    return (
        <div>
          <Elements stripe={stripePromise}>
      <PaymentForm/>
          </Elements>
      
        </div>
    );
};

export default Payment;