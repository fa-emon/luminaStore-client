import { useEffect, useState } from "react";
import useClothes from "../../../hooks/useClothes";
import { Button } from "@chakra-ui/react";
import ShowKidsProduct from "./ShowKidsProduct";
import { FaArrowCircleRight } from 'react-icons/fa';


const KidsProduct = () => {
    const [clothes] = useClothes();
    const kidsData = clothes.filter(data => data.category === 'kids');

    const [visibleItems, setVisibleItems] = useState(12);

    const handleSeeMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 12);
    };

    // {-----This part for autotyping text-----}
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const textToType = 'Showing 1-12 out of 20 products';
        let index = 0;

        const typingInterval = setInterval(() => {
            setTypedText(textToType.substring(0, index));
            index++;

            if (index > textToType.length) {
                clearInterval(typingInterval);
            }
        }, 150);

        return () => clearInterval(typingInterval);
    }, []);
    // {-----This part for autotyping text-----}

    return (
        <div className='px-10 mb-20'>
            <div className='flex justify-between items-center py-8'>
                <h2 className='heading-font font-semibold text-[#585858]'>{typedText}</h2>
                <Button className='bg-[#CBE8EE] hover:bg-black text-[#585858] hover:text-white rounded-full px-2 py-1'>
                    <span className='tracking-wider heading-font font-extrabold px-8 py-2'>sort by</span>
                </Button>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {kidsData.slice(0, visibleItems).map((kidsData) => (
                    <ShowKidsProduct
                        key={kidsData._id}
                        kidsData={kidsData}
                    ></ShowKidsProduct>
                ))}
            </div>

            <div className="mx-auto flex justify-center items-center">
                {visibleItems < kidsData.length && (
                    <Button onClick={handleSeeMore} className='bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-full px-2 py-4 mb-20 w-[200px]' colorScheme='twitter' rightIcon={<FaArrowCircleRight className='heartbeat' />}>
                        <span className='tracking-wider heading-font font-extrabold'>see more</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default KidsProduct;