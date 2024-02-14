import { useQuery } from "react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ShowHistory from "./ShowHistory";


const PaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: payment = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data;
        }
    })

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <img className="wobble-hor-bottom" style={{ height: '20vh', width: '20vh', objectFit: 'contain' }} src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png" alt="" />
                <p className="text-center text-[#202020] text-5xl heading-font"> <span className="text-white">PAYMENT</span> HISTORY</p>
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

            <div className="overflow-x-auto text-white mt-6 w-full bg-[] rounded-md">
                <table className="table heading-font tracking-widest">
                    {/* head */}
                    <thead className="text-[#202020]">
                        <tr className="bg-[#CBE8EE]">
                            <th>INDEX</th>
                            <th>EMAIL</th>
                            <th className="ps-4">TRANSACTION ID</th>
                            <th className="text-center">STATUS</th>
                            <th className="text-center">PRICE</th>
                            <th className="text-center">DATE</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            payment.map((product, index) => <ShowHistory
                                key={product._id}
                                product={product}
                                index={index} >
                            </ShowHistory>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentHistory;