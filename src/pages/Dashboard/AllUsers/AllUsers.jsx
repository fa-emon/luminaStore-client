import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user`)
            return response.data;
        },
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/user/admin/${user._id}`)
            .then((response) => response.data)
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${id}`)
                    .then((response) => response.data)
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            refetch(); // for refresh
                            Swal.fire({
                                title: "Deleted!",
                                text: "One user has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <img className="wobble-hor-bottom" style={{ height: '20vh', width: '20vh', objectFit: 'contain' }} src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png" alt="" />
                <p className="text-center text-[#202020] text-5xl heading-font"> <span className="text-white">MANAGE</span> ALL USERS : {user.length}</p>
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

            <div className="overflow-x-auto">
                <table className="table text-[#202020] heading-font">
                    {/* head */}
                    <thead className="text-[#202020] heading-font tracking-wider">
                        <tr>
                            <th>NO</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, index) => <tr key={user._id}>
                                <th className="">{index + 1}</th>
                                <td className="">{user?.name}</td>
                                <td className="">{user?.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? <h2 className="text-green-600">admin</h2> :
                                            <FaUser onClick={() => handleMakeAdmin(user)} className='text-base cursor-pointer hover:text-green-600 ms-2'></FaUser>
                                    }
                                </td>
                                <td className="ps-8"><MdDelete onClick={() => handleDelete(user._id)} className='text-xl cursor-pointer  hover:text-red-600'></MdDelete></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllUsers;