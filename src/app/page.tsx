import HeroSection from "src/components/homepage/herosection";
import PopularCreator from "src/components/homepage/popularCreator";
import PopularProject from "src/components/homepage/popularProject";

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
