import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <>
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
        </>
    }
    if (user?.displayName) {
        return children;
    }
    else {
        return <Navigate to={'/login'} state={{ from: location }} replace >Sign In</Navigate>;
    }
};

export default PrivateRoute;