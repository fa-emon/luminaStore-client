import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const SubscriptionSection = () => {

    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const textToType = 'your email..';
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

    return (
        <div className="px-10 mb-20">
            <div className="w-full pl-14 relative">
                <img className='opacity-50' src="https://i.ibb.co/5j98Rqg/594192a35eb5d45f10e35b30.png" alt="" />

                <div className='absolute w-full pt-32 bottom-0 top-0 animate__animated animate__fadeInLeft'>
                    <h2 className="heading-font text-5xl font-extrabold text-center">Get Exclusive Offers On Your Email!
                    </h2>

                    <p className='heading-font mt-8 opacity-80 text-center mb-20'>Subscribe to our newsletter and stay updated.</p>

                    <div className="flex items-center justify-center relative">
                        <input type="text" placeholder={typedText} className="input input-bordered w-1/3 bg-white text-black heading-font rounded-2xl py-8" />

                        <Button className='bg-black text-white rounded-full px-2 py-1 absolute right-9'>
                            <span className='tracking-wider heading-font font-extrabold px-8 py-4'>Subscribe</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSection;