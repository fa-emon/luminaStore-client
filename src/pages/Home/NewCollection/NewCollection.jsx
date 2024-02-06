import { useState } from "react";
import useClothes from "../../../hooks/useClothes";
import ShowNewCollection from "./ShowNewCollection";
import { Button } from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';


const NewCollection = () => {
    const [clothes] = useClothes();
    const newCollectionData = clothes.filter(data => data.category === 'new_collection');

    const [visibleItems, setVisibleItems] = useState(8);

    const handleSeeMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 8);
    };

    return (
        <div>
            <h2 className="heading-font font-extrabold text-5xl text-center p-20 uppercase">New Arrivals</h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
                {newCollectionData.slice(0, visibleItems).map((newCollectionData) => (
                    <ShowNewCollection
                        key={newCollectionData._id}
                        newCollectionData={newCollectionData}
                    ></ShowNewCollection>
                ))}
            </div>

            <div className="mx-auto flex justify-center items-center">
                {visibleItems < newCollectionData.length && (
                    <Button onClick={handleSeeMore} className='bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded px-2 py-4 mb-20 w-3/4' colorScheme='twitter' rightIcon={<FaArrowCircleRight className='heartbeat' />}>
                        <span className='tracking-wider heading-font font-extrabold'>see more</span>
                    </Button>
                )}
            </div>
        </div>
    );
};


export default NewCollection;