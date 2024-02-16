import { MdDelete } from 'react-icons/md';
import useOrder from '../../../hooks/useOrder';
import Swal from 'sweetalert2';

const ShowOrder = ({ item }) => {
    const [, refetch] = useOrder();
    const { short_description, quantity, image, new_price, _id } = item;

    // Calculate the total price for each item
    const total = (quantity * new_price).toFixed(2);

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
                fetch(`https://lumina-store-server.vercel.app/order/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            refetch(); // for refresh
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been deleted.",
                                icon: "success"
                            });
                        }
                    });
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
            <td className='heading-font'>
                <span className='ms-7'>{quantity}</span>
            </td>
            <td className='heading-font'>
                ${total}
            </td>
            <th>
                <MdDelete onClick={() => handleDelete(_id)} className='text-xl hover:text-red-600 ms-5'></MdDelete>
            </th>
        </tr>
    );
};

export default ShowOrder;