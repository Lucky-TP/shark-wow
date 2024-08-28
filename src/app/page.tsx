import HeroSection from "src/components/homepage/HeroSection";
import PopularProject from "src/components/homepage/PopularProject";
import PopularCreator from "src/components/homepage/PopularCreator";

export default function RootPage() {
    return (
        <section className="">
            <HeroSection/>
            <PopularProject/>
            <PopularCreator/>
        </section>
    );
}
