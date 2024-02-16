import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";
import Register from "../pages/Shared/Register/Register";
import Men from "../pages/Men/Men/Men";
import Women from "../pages/Women/Women/Women";
import Kids from "../pages/Kids/Kids/kids";
import SpecificDetails from "../pages/Women/SpecificDetails/SpecificDetails";
import Dashboard from "../layout/Dashboard";
import MyOrder from "../pages/Dashboard/MyOrder/MyOrder";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import UpdateProduct from "../pages/Dashboard/UpdateProduct/UpdateProduct";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/men',
                element: <Men></Men>
            },
            {
                path: '/women',
                element: <Women></Women>
            },
            {
                path: '/clothes/category/:id',
                loader: async ({ params }) => {
                    return fetch(`https://lumina-store-server.vercel.app/clothes/category/${params.id}`);
                },
                element: <SpecificDetails></SpecificDetails>
            },
            {
                path: '/kids',
                element: <Kids></Kids>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'myOrder',
                element: <MyOrder></MyOrder>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            //admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addProducts',
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            },
            {
                path: 'manageProducts',
                element: <AdminRoute><ManageProducts></ManageProducts></AdminRoute>
            },
            {
                path: 'updateProducts/:id',
                loader: async ({ params }) => {
                    return fetch(`https://lumina-store-server.vercel.app/clothes/category/${params.id}`);
                },
                element: <AdminRoute><UpdateProduct></UpdateProduct></AdminRoute>
            }
        ]
    }
])