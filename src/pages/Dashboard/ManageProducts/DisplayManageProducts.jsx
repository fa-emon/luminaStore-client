import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClothes from "../../../hooks/useClothes";
import { LuPenSquare } from "react-icons/lu";
import { MdDelete } from 'react-icons/md';
import { useNavigate } from "react-router-dom";


const DisplayManageProducts = ({products}) => {
    const { image, short_description, new_price, _id } = products;

    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const [, , refetch] = useClothes();

    const handleUpdate = () => {
        navigate(`/dashboard/updateProducts/${_id}`)
    }

    const handleDelete = (id) => {
        console.log(id)
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

                axiosSecure.delete(`/clothes/${id}`)
                    .then((response) => {
                        if (response.data.deletedCount > 0) {
                            refetch(); // for refresh
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <tr className='text-[#202020]'>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded-md w-28 h-28">
                            <img src={image} />
                        </div>
                    </div>
                </div>
            </td>
            <td className="heading-font tracking-wide">
                {short_description}
            </td>
            <td className='heading-font'>
                ${new_price}
            </td>
            <th>
                <LuPenSquare onClick={handleUpdate} className='text-xl hover:text-green-600 ms-4'></LuPenSquare>
            </th>
            <th>
                <MdDelete onClick={() => handleDelete(_id)} className='text-xl hover:text-red-600 ms-4'></MdDelete>
            </th>
        </tr>
    );
};

export default DisplayManageProducts;