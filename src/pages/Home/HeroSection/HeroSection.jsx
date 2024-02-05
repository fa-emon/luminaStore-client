import { Button } from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'
import { useEffect, useState } from 'react';
import 'animate.css';

const HeroSection = () => {

    const navigate = useNavigate();
    const handleSeeAbout = () => {
        navigate('/')
    }

    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const textToType = 'Discover Trends';
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
        <div className="flex px-10 pt-40">
            <div className="w-1/2 pl-14 relative">
                <img className='opacity-50' src="https://i.ibb.co/5j98Rqg/594192a35eb5d45f10e35b30.png" alt="" />

                <div className='absolute bottom-0 top-0'>
                    <p className='heading-font font-semibold mb-2 text-black'>CHOOSE YOUR WAY</p>

                    <h2 className="heading-font text-5xl font-bold"> <span className="heading-font font-extrabold text-9xl flex items-center">L <span><img className='bounce-top' style={{ width: '95px', height: '95px', marginTop: '15px' }} src="https://i.ibb.co/mydBMSS/11045565.png" alt="" /></span> ok's</span>
                    </h2>
                    <p className="heading-font text-5xl font-bold">New Everyday</p>

                    <p className='heading-font text-justify w-3/4 mt-6 opacity-80'>Revolutionize Your Shopping Experience: Unveiling a New Era in Fashion.A New Era of Style Awaits. Discover, Shop, and Redefine Your Fashion Experience.</p>

                    <Button onClick={handleSeeAbout} className='bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded px-2 py-1 mt-5' colorScheme='twitter' rightIcon={<FaArrowCircleRight className='' />}>
                        <span className='tracking-wider heading-font font-extrabold'>{typedText}</span>
                    </Button>
                </div>
            </div>

            <div className="w-1/2 pl-40">
                <img className='animate__animated animate__fadeInRight' src="https://i.ibb.co/0yFvRBj/284-2844044-fashion-toys-electrical-items-and-more-girl-with.png" alt="" />
            </div>
        </div>
    );
};

export default HeroSection;