import React from 'react';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise=loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
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