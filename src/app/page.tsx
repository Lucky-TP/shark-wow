import ContainerFooter from "src/components/global/footer/containerFooter";
import MainNav from "src/components/global/navigation/mainNav";
import Herosection from "src/components/homepage/herosection";

export default function RootPage() {
    return (
        <section>
            <MainNav/>
            <Herosection/>
            <ContainerFooter/>
            
        </section>
    );
}
