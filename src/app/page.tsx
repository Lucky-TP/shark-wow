import Footer from "src/components/global/footer/containerFooter";
import MainNav from "src/components/global/navigation/mainNav";
import Herosection from "src/components/homepage/herosection";
import PopularProject from "src/components/homepage/popularProject";

export default function RootPage() {
    return (
        <section>
            <MainNav/>
            <Herosection/>
            <PopularProject/>
            <Footer/>
            
        </section>
    );
}
