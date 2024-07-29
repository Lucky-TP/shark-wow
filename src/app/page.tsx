import HeroSection from "src/components/homepage/HeroSection";
import PopularCreator from "src/components/homepage/PopularCreator";
import PopularProject from "src/components/homepage/PopularProject";

export default function RootPage() {
    return (
        <>
            <HeroSection/>
            <PopularProject/>
            <PopularCreator/>
        </>
    );
}
