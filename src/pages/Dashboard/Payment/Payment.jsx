import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useOrder from "../../../hooks/useOrder";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [order, refetch] = useOrder();

    const total = order.reduce((sum, item) => sum + item.quantity * item.new_price, 0);
    const price = parseFloat(total.toFixed(2));

    const totalQuantity = order.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <>
            <div className="flex items-center justify-center w-full">
                <img className="wobble-hor-bottom" style={{ height: '20vh', width: '20vh', objectFit: 'contain' }} src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png" alt="" />
                <p className="text-center text-[#C9AB81] text-5xl heading-font"> <span className="text-white">PAY</span>MENT</p>
                <img
                    className="wobble-and-rotate"
                    style={{
                        height: '20vh',
                        width: '20vh',
                        objectFit: 'contain',
                        transform: 'scaleX(-1)',
                    }}
                    src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png"
                    alt=""
                />
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm order={order} price={price} totalQuantity={totalQuantity} refetch={refetch}/>
            </Elements>
        </>

    );
};

export default Payment;