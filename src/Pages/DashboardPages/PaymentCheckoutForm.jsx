import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';


// ! pre-built UI components for securely collecting card information
const PaymentCheckoutForm = () => {

    const {parcelId} = useParams();
    console.log(parcelId)

    const [paymentError , setPaymentError] = useState('');

    const stripe = useStripe();
    const element = useElements();


    const handleCheckout = async(e) => {
        e.preventDefault();

        if(!stripe || !element){
            return;
        }

        const card = element.getElement(CardElement);

        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            setPaymentError(error.message);
        }
        else{
            console.log("payment method", paymentMethod);
            setPaymentError('');
        }

    }
    return (
        <form onSubmit={handleCheckout} className="mt-70 space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded"></CardElement>
                <button
                    type='submit'
                    className="btn bg-[#CAEB66] text-black text-3xl font-bold w-full"
                    disabled={!stripe}
                >
                    Pay for the parcel 
                </button>
                {
                    paymentError && <p className='text-red-700'>{paymentError}</p>
                }
            </form>
    );
};

export default PaymentCheckoutForm;