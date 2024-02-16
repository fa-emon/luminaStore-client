import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import useAdmin from "../hooks/useAdmin";
import useOrder from "../hooks/useOrder";
import { FaTshirt } from "react-icons/fa";
import { IoMan } from "react-icons/io5";
import { IoWoman } from "react-icons/io5";


const Dashboard = () => {
    const [order] = useOrder();
    const totalQuantity = order.reduce((sum, item) => sum + item.quantity, 0);

    // TODO: load data from the server to have dynamic isAdmin on data.
    // const isAdmin = true;

    const [isAdmin] = useAdmin();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col px-10 w-full">

                <Outlet></Outlet>

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#CBE8EE]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full text-base-content heading-font tracking-wide">
                    {/* Sidebar content here */}
                    {
                        isAdmin ?
                            <>
                                <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                                    <Link to={'/dashboard/adminHome'}><AiFillHome className="text-lg" />ADMIN HOME</Link>
                                </li>
                                <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                                    <Link to={'/dashboard/addProducts'}><FaTshirt className="text-lg" />ADD PRODUCTS</Link>
                                </li>
                                <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                                    <Link to={'/dashboard/manageProducts'}><GiHamburgerMenu className="text-lg" />MANAGE PRODUCTS</Link>
                                </li>
                                <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                                    <Link to={'/dashboard/allusers'}><FaUsers className="text-lg" />ALL USERS</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                                    <Link to={'/dashboard/myOrder'}><FaShoppingCart className="text-lg" />MY ORDER<div className="badge bg-black hover:bg-[#CBE8EE] text-white hover:text-black border-[#CBE8EE]">+{totalQuantity || 0}</div></Link>
                                </li>
                                <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                                    <Link to={'/dashboard/paymentHistory'}><IoWalletSharp className="text-lg" />PAYMENT HISTORY</Link>
                                </li>
                            </>
                    }

                    <hr style={{ backgroundColor: 'black', height: '2px', border: 'none', marginTop: '10px', marginBottom: '10px' }} />

                    <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                        <Link to={'/'}><IoHome className="text-lg" />HOME</Link>
                    </li>
                    <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                        <Link to={'/men'}><IoMan className="text-lg" />MEN</Link>
                    </li>
                    <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                        <Link to={'/women'}><IoWoman className="text-lg" />WOMEN</Link>
                    </li>
                    <li className="bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md">
                        <Link to={'/kids'}><PiFinnTheHumanFill className="text-lg" />KIDS</Link>
                    </li>
                </ul>

            </div>
        </div>
    );
};


export default Dashboard;