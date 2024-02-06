import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const MenAdvertiseBanner = () => {
    const images = [
        "https://i.ibb.co/p3ytH6V/man-studio-portrait-light-90764.jpg",
        "https://i.ibb.co/6Xzpx3v/1706607347754-8b9dbd8b-fab0-4734-ae90-f998fd6143de-auto-format-compress-w-3840-h-2160-fit-crop-crop.jpg",
        "https://i.ibb.co/NZYxdhC/FZEb-Z0-OWAAAMods-format-jpg-name-4096x4096.jpg",
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


export default MenAdvertiseBanner;