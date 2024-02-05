import { Button } from '@chakra-ui/react';
import './ExclusiveOfferSection.css'


const ExclusiveOfferSection = () => {
    return (
        <div className="flex items-center justify-center px-10 mb-20">
            <div className="w-1/2 pl-14 relative">
                <img className='opacity-50' src="https://i.ibb.co/5j98Rqg/594192a35eb5d45f10e35b30.png" alt="" />

                <div className='absolute bottom-0 top-0 animate__animated animate__fadeInLeft'>
                    <h2 className="heading-font text-5xl font-bold"> <span className="heading-font font-extrabold text-9xl flex items-center">Exclusive</span>
                    </h2>
                    <p className="heading-font text-5xl font-bold">Offers for you</p>

                    <p className='heading-font text-justify w-3/4 mt-6 opacity-80'>Elevate Your Style with Our Special Collection. Shop Now!</p>
                    <Button className='bg-black text-white rounded-full px-2 py-1 mt-6 blink-1'>
                        <span className='tracking-wider heading-font font-extrabold px-8 py-4'>Hurry up!</span>
                    </Button>
                </div>
            </div>

            <div className="w-1/2 me-14">
                <div className=" pr-10 me-14">
                    <div style={{ width: '130%', height: '130%', overflow: 'hidden' }}>
                        <img
                            className='animate__animated animate__fadeInRight'
                            src="https://i.ibb.co/rdT04gK/front-view-young-beautiful-woman-black-white-polka-dot-dress-red-sunglasses-holding-shopping-package.png"
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ExclusiveOfferSection;