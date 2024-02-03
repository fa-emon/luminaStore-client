import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";


const Main = () => {
    const location = useLocation();
    const isOnErrorPage = location.pathname === '/errorPage';

    return (
        <div>
            {!isOnErrorPage && <Navbar></Navbar>}
            <Outlet></Outlet>
            {!isOnErrorPage && <Footer></Footer>}
        </div>
    );
};

export default Main;