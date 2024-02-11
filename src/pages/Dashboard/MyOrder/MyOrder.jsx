import { Link } from "react-router-dom";
import useOrder from "../../../hooks/useOrder";
import ShowOrder from "./ShowOrder";


const MyOrder = () => {
    const [order] = useOrder();
    const total = order.reduce((sum, item) => sum + parseFloat(item.new_price), 0);

    return (
        <div>
            <div className="text-[#202020] flex justify-between w-full my-4 heading-font tracking-wide font-semibold">
                <h2>TOTAL ORDER : {order.length}</h2>
                <h2>TOTAL PRICE : ${total.toFixed(2)}</h2>
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
                            <th>ACTION</th>
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