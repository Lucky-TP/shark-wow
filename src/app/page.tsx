import HeroSection from "src/components/homepage/HeroSection";
import PopularProject from "src/components/homepage/PopularProject";
import PopularCreatorCard from "src/components/homepage/PopularCreatorCard";

export default function RootPage() {
    return (
        <section className="">
            <HeroSection/>
            <PopularProject/>
            <PopularCreatorCard/>
        </section>
    );
}
