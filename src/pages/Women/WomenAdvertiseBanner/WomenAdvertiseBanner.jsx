import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const WomenAdvertiseBanner = () => {
    const images = [
        "https://i.ibb.co/F08kH28/pexels-photo-3951790.jpg",
        "https://i.ibb.co/p309dwW/pexels-photo-1004877.jpg",
        "https://i.ibb.co/qFn4YNS/pexels-photo-6069561.jpg",
    ];

    return (
        <div className='pt-[74px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} style={{ height: '100vh' }}>
                        <img src={image} alt={`Ad ${index + 1}`} className="w-full h-full object-cover brightness-75" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default WomenAdvertiseBanner;