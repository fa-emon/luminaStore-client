import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";
import Register from "../pages/Shared/Register/Register";
import Men from "../pages/Men/Men/Men";
import Women from "../pages/Women/Women/Women";
import Kids from "../pages/Kids/Kids/kids";
import SpecificDetails from "../pages/Women/SpecificDetails/SpecificDetails";

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
                    return fetch(`http://localhost:5000/clothes/category/${params.id}`);
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
    }
])