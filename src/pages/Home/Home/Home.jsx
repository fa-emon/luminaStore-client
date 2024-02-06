import ExclusiveOfferSection from "../ExclusiveOfferSection/ExclusiveOfferSection";
import NewCollection from "../NewCollection/NewCollection";
import PopularSection from "../PopularSection/PopularSection";
import SubscriptionSection from "../SubscriptionSection/SubscriptionSection";
import HeroSection from "../heroSection/HeroSection";


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <PopularSection></PopularSection>
            <ExclusiveOfferSection></ExclusiveOfferSection>
            <NewCollection></NewCollection>
            <SubscriptionSection></SubscriptionSection>
        </div>
    );
};

export default Home;