import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const KidsAdvertiseBanner = () => {
    const images = [
        "https://i.ibb.co/J7fjzY6/pexels-photo-7743756.jpg",
        "https://i.ibb.co/j8zL605/pexels-photo-6137881.jpg",
        "https://i.ibb.co/s1nMgdq/pexels-photo-8084487.jpg",
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

export default KidsAdvertiseBanner;