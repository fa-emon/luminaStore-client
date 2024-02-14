import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ order, price, totalQuantity, refetch }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setCardError(error.message)
        }
        else {
            setCardError('');
            // console.log('paymentMethod', paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown', email: user?.email || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('paymentIntent', paymentIntent)
        setProcessing(false);

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                quantity: totalQuantity,
                date: new Date(), //TODO: USE MOMENT JS
                status: 'service pending',
                orderProducts: order.map(product => product._id),
                productsId: order.map(product => product.category_id)
            }
            axiosSecure.post('/payment', payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertResult.
                        insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "your payment has been successful!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch(); //for refresh
                        navigate('/dashboard/paymentHistory');
                    }
                })
        }

    }

    return (
        <>
            <form className="mt-10 w-full" onSubmit={handleSubmit}>
                <CardElement className="bg-[#202020] p-4"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#C9AB81',
                                '::placeholder': {
                                    color: '#C9AB81',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="text-black font-semibold heading-font uppercase tracking-wider bg-[#C9AB81] btn-sm hover:bg-[#0a0a0a] hover:text-[#C9AB81] rounded-md mt-10" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 mt-4">{cardError}</p>}
            {
                transactionId && <div className="flex items-center">
                    <span className="text-[#C9AB81]">Transaction ID: </span>
                    <p className="text-green-600 my-6 ms-4">{transactionId}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;