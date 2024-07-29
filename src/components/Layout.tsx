import { type NextPage } from "next";
import { Layout as AntdLayout } from "antd";
import Navbar from "./global/navigation/Navbar";
import Footer from "./global/footer/Footer";
interface Props {
    children: React.ReactNode;
}

const Layout: NextPage<Props> = ({children}) => {
    return (
        <AntdLayout className="min-h-screen w-screen">
            <Navbar/>
            <main className="min-h-screen">{children}</main>
            <Footer/>
        </AntdLayout>
    );
};

export default Layout;