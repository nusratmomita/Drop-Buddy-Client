import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentCheckoutForm from './PaymentCheckoutForm';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const PaymentIntegration = () => {
    
    return (
        <Elements stripe={stripePromise}>
            <PaymentCheckoutForm/>
        </Elements>
    );
};

export default PaymentIntegration;