import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentCheckoutForm from './PaymentCheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);

const PaymentIntegration = () => {
    
    return (
        <Elements stripe={stripePromise}>
            <PaymentCheckoutForm/>
        </Elements>
    );
};

export default PaymentIntegration;