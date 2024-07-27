import { type NextPage } from "next";
import { Layout as AntdLayout } from "antd";
import Navbar from "./global/navigation/mainNav";
import Footer from "./global/footer/containerFooter";
interface Props {
    children: React.ReactNode;
}

const Layout: NextPage<Props> = ({children}) => {
    return (
        <AntdLayout className="min-h-screen w-screen">
            <Navbar/>
            {children}
            <Footer/>
        </AntdLayout>
    );
};

export default Layout;