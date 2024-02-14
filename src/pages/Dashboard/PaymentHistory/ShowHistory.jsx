import useAuth from "../../../hooks/useAuth";


const ShowHistory = ({ product, index }) => {
    const { user } = useAuth();
    const {transactionId, status, price, date } = product;

    return (
        <>
            <tr className='text-[#202020]'>
                <td className="heading-font tracking-wide">
                    {index+1}
                </td>
                <td className="heading-font tracking-wide">
                    {user?.email}
                </td>
                <td className='heading-font'>
                    <span className="text-green-600">{transactionId}</span>
                </td>
                <td className='heading-font'>
                    <span className="text-red-600">{status}</span>
                </td>
                <td className='heading-font'>
                    ${price}
                </td>
                <td className='heading-font'>
                   {date}
                </td>
            </tr>
        </>
    );
};

export default ShowHistory;