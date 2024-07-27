import Footer from "src/components/global/footer/containerFooter";
import MainNav from "src/components/global/navigation/mainNav";
import Herosection from "src/components/homepage/herosection";
import PopularCreator from "src/components/homepage/popularCreator";
import PopularProject from "src/components/homepage/popularProject";

export default function RootPage() {
    return (
        <>
            <Herosection/>
            <PopularProject/>
            <PopularCreator/>
        </>
    );
}
