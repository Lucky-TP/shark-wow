"use client";
import { type NextPage } from "next";
import { Layout as AntdLayout, ConfigProvider } from "antd";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
import { usePathname } from "next/navigation";
import { UserProvider } from "src/context/useUserData";
import { Suspense } from "react";
import LoadingPage from "./LoadingPage";

interface Props {
    children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
    const hiddenPaths = ["/sign-in", "/sign-up"]; // Add more path to hide Navbar and Footer
    const currentPath = usePathname();
    const hideNavbarAndFooter = hiddenPaths.includes(currentPath);

    return (
        <AntdLayout className="min-h-screen w-screen">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#C54F1F",
                    },
                    components: {
                        Button: {
                            colorPrimaryBorderHover: "#C54F1F",
                            colorPrimaryHover: "#C54F1F",
                            colorPrimary: "#C54F1F",
                            colorPrimaryActive: "#C54F1F",
                            colorPrimaryTextHover: "#C54F1F",
                        },
                    },
                }}
            >
                <Suspense fallback={<LoadingPage />}>
                    {!hideNavbarAndFooter && <Navbar />}
                    <main className="min-h-screen bg-orange-50 pt-[10vh]">{children}</main>
                    {!hideNavbarAndFooter && <Footer />}
                </Suspense>
            </ConfigProvider>
        </AntdLayout>
    );
};

export default Layout;
