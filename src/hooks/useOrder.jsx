import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useOrder = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const { refetch, data: order = [] } = useQuery({
        queryKey: ['order', user?.email],
        enabled: !loading, // when doesn't any loading, then this useQuery will be enabled.
        queryFn: async () => {
            const res = await axiosSecure.get(`/order?email=${user.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })
    return [order, refetch]
};

export default useOrder;