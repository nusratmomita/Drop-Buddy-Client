import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAxiosSecureAPI from '../../CustomHooks/UseAxiosSecureAPI';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthContext';
import Swal from 'sweetalert2';


// ! pre-built UI components for securely collecting card information
const PaymentCheckoutForm = () => {

    const navigate =useNavigate();

    const {user} = useContext(AuthContext);

    const stripe = useStripe();
    const elements = useElements();
    const [paymentError , setPaymentError] = useState('');

    const {parcelId} = useParams();
    // console.log(parcelId);

    const axiosApi = UseAxiosSecureAPI();

    // ! tanSTack is used to fetch data from the server.prev we used useState and useEffect to load data
    const {data: parcelInfo={}  , isPending} = useQuery({
        queryKey: ['parcel', parcelId],// my unique key for this query [parcel: 6866b74c656db9545ab8681d]
        queryFn: async() => {
            const res = await axiosApi.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    
    if(isPending){
        return <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
                </div>
    }

    // console.log(parcelInfo);
    const totalCost = parcelInfo.totalCost || 0;
    const totalCostInCents = totalCost*100; // as stripe only takes amount in cents
    
    
    const handleCheckout = async(e) => {
        e.preventDefault();

        // 1: getting the card info
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

        // * step-1 get the card info and validate the card info
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

            // * step-2 creating a intent
            const res = await axiosApi.post('/parcels/create-payment-intent' , {
                totalCostInCents,
                parcelId
            })

            const clientSecret = res.data.clientSecret;

            // * step-3 confirm the payment
            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    }
                }
            });

            if(result.error){
                setPaymentError(result.error.message)
            }
            else{
                setPaymentError('');
                if(result.paymentIntent.status === 'succeeded'){
                    // console.log("Payment successful");
                    // console.log(result);

                    // * step-4 update the payment status and make payment history
                    const paymentData = {
                        parcelId,
                        email: user?.email,
                        amount: totalCost,
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    // console.log(paymentData);

                    const paymentRes = await axiosApi.post("/payments", paymentData)
                    console.log(paymentRes)
                    if(paymentRes.data.insertedId){
                         await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        navigate('/dashboard/myParcels');
                    }
                }
            }
        }           
    }
    return (
        <form onSubmit={handleCheckout} className="mt-70 space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded"></CardElement>
                <button
                    type='submit'
                    className="btn bg-[#CAEB66] text-black p-6 text-2xl font-bold w-full"
                    disabled={!stripe}
                >
                    Pay ৳{totalCost}
                </button>
                {
                    paymentError && <p className='text-red-700'>{paymentError}</p>
                }
            </form>
    );
};

export default PaymentCheckoutForm;