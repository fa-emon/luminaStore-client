import { useState } from "react";
import useClothes from "../../../hooks/useClothes";
import ShowAllData from "./ShowAllData";
import { Button } from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';


const PopularSection = () => {
    const [clothes] = useClothes();
    const popularData = clothes.filter(data => data.category === 'popular');

    const [visibleItems, setVisibleItems] = useState(4);

    const handleSeeMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 4);
    };

    return (
        <div>
            <h2 className="heading-font font-extrabold text-5xl text-center p-20 uppercase">Trendy collections</h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
                {popularData.slice(0, visibleItems).map((popularCollection) => (
                    <ShowAllData
                        key={popularCollection._id}
                        popularCollection={popularCollection}
                    ></ShowAllData>
                ))}
            </div>

            <div className="mx-auto flex justify-center items-center">
                {visibleItems < popularData.length && (
                    <Button onClick={handleSeeMore} className='bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded px-2 py-4 my-20 w-3/4' colorScheme='twitter' rightIcon={<FaArrowCircleRight className='' />}>
                        <span className='tracking-wider heading-font font-extrabold'>see more</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PopularSection;