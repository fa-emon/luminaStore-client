import ExclusiveOfferSection from "../ExclusiveOfferSection/ExclusiveOfferSection";
import PopularSection from "../PopularSection/PopularSection";
import HeroSection from "../heroSection/HeroSection";


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <PopularSection></PopularSection>
            <ExclusiveOfferSection></ExclusiveOfferSection>
        </div>
    );
};

export default Home;