"use client"
import { type NextPage } from "next";
import { Layout as AntdLayout } from "antd";
import Navbar from "./global/navigation/Navbar";
import Footer from "./global/footer/Footer";
import { usePathname } from "next/navigation";
interface Props {
    children: React.ReactNode;
}

const Layout: NextPage<Props> = ({children}) => {
    const hiddenPaths = ["/sign-in", "/sign-up"]; // Add more path to hide Navbar and Footer
    const currentPath = usePathname();
    const hideNavbarAndFooter = hiddenPaths.includes(currentPath);

    return (
        <AntdLayout className="min-h-screen w-screen">
            {!hideNavbarAndFooter && (<Navbar/>)}
            <main className="min-h-screen">{children}</main>
            {!hideNavbarAndFooter && (<Footer/>)}
        </AntdLayout>
    );
};

export default Layout;