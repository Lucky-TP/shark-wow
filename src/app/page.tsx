import HeroSection from "src/components/homepage/herosection";
import PopularCreator from "src/components/homepage/PopularCreator";
import PopularProject from "src/components/homepage/PopularProject";

export default function RootPage() {
    return (
        <section className="">
            <HeroSection/>
            <PopularProject/>
            <PopularCreator/>
            {/*kuaytoey ai sus*/}
        </section>
    );
}
