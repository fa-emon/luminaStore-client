import { Link } from "react-router-dom";
import useOrder from "../../../hooks/useOrder";
import ShowOrder from "./ShowOrder";
import './MyOrder.css'


const MyOrder = () => {
    const [order] = useOrder();

    //Total Order
    const totalQuantity = order.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate subtotal and total
    const total = order.reduce((sum, item) => sum + item.quantity * item.new_price, 0);

    return (
        <div>
            <div className="text-[#202020] flex justify-between w-full my-4 heading-font tracking-wide font-semibold">
                <h2><span className="text-white">TOTAL</span> ORDER : {totalQuantity}</h2>
                <div className="w-1/2 flex items-center justify-between">
                    <div className="flex items-center justify-center">
                        <img className="wobble-hor-bottom" style={{ height: '20vh', width: '20vh', objectFit: 'contain' }} src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png" alt="" />

                        <div className="uppercase">
                            <h2>Sub Total :</h2>
                            <h2 className="text-[#808080]">Shipping fee :</h2>
                            <hr style={{ backgroundColor: 'black', height: '2px', border: 'none', marginTop: '10px', marginBottom: '10px' }} />
                            <h2>Total : </h2>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="uppercase">
                            <h2>${total}</h2>
                            <h2 className="text-[#808080]">free</h2>
                            <hr style={{ backgroundColor: 'black', height: '2px', border: 'none', marginTop: '10px', marginBottom: '10px' }} />
                            <h2>${total}</h2>
                        </div>

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
                </div>
                <Link to={'/dashboard/payment'}>
                    <button className="btn btn-sm bg-[#CBE8EE] hover:bg-black hover:text-white border-[#808080] tracking-wider">PAY</button>
                </Link>
            </div>
            <div className="overflow-x-auto text-white mt-6 w-full bg-[] rounded-md">
                <table className="table heading-font tracking-widest">
                    {/* head */}
                    <thead className="text-[#202020]">
                        <tr>
                            <th>IMAGE</th>
                            <th>DETAILS</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>TOTAL</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map(item => <ShowOrder
                                key={item._id}
                                item={item}>
                            </ShowOrder>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;