import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';


const ShowNewCollection = ({ newCollectionData }) => {
    const navigate = useNavigate();
    const { image, short_description, old_price, new_price } = newCollectionData;

    const handleSeeDetails = (id) => {
        navigate(`/menu/category/${id}`);
    }

    return (
        <div className="card bg-[#F3FCE4] shadow-xl mb-20">
            <figure><img className="transform hover:scale-90 transition-transform duration-700 hover:brightness-95" style={{ height: '50vh', objectFit: 'cover', width: '100%' }} src={image} alt="" /></figure>
            <div className="card-body text-black p-4">
                <p className="heading-font text-sm font-semibold text-[#5f5f5f] mb-2">{short_description}</p>
                <div className="flex justify-between">
                    <div>
                        <h2 className="heading-font text-[#313131] text-sm font-semibold">${new_price}</h2>
                    </div>
                    <div>
                        <p className="heading-font text-[#808080] text-sm font-semibold">$<span className="line-through">{old_price}</span></p>
                    </div>
                </div>
            </div>
            <Button onClick={() => handleSeeDetails(newCollectionData._id)} className='bg-[#e9e9e9] hover:bg-[#CBE8EE] text-[#585858] hover:text-black rounded-b-md px-2 py-2'>
                <span className='tracking-wider heading-font uppercase font-semibold text-sm'>See Details</span>
            </Button>
        </div>
    );
};

export default ShowNewCollection;