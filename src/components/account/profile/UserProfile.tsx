"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { pagePath } from "src/constants/routePath";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";
import { UserInfo } from "../UserInfo";
import LoadingPage from "src/components/global/LoadingPage";

type Props = {};

export default function UserProfile({}: Props) {
    // เปลี่ยนชื่อเป็น UserProfile
    const [user, setUser] = useState<UserData>();
    const [loading, setLoading] = useState<boolean>(false);
    const { user: authUser, authLoading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                if (!authUser) {
                    router.push(pagePath.SIGNIN);
                    return;
                }
                const result = await getSelf();
                setUser(result.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };
        if (!authLoading) {
            fetchUserProfile();
        }
    }, [authUser]);
    if (loading) {
        return <LoadingPage />;
    }
    return (
        <div>
            <div className="bg-[#E5D8CA] flex items-start">
                <div className="w-full">
                    <UserInfo user={user} />
                    <div className="bg-[#E5D8CA] flex items-center justify-center">
                        <div className="flex items-start mt-10">
                            <Image
                                src={user?.profileImageUrl || ""} // Replace with your image path
                                alt="Profile"
                                className="rounded-full w-64 h-64 object-cover"
                                width={256}
                                height={256}
                            />
                        </div>
                        <div className="text-black text-3xl mb-6 ml-20 ">
                            <p>{user?.address[0]?.country}</p>
                            <p>
                                Website:{" "}
                                <a
                                    href="https://wtchai.com"
                                    className="text-blue-600"
                                >
                                    https://wtchai.com
                                </a>
                            </p>
                        </div>
                        <div className="flex flex-col space-y-6 ml-20">
                            <a
                                href={user?.contact.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 text-3xl"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-3xl"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href={user?.contact.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 text-3xl"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                    <div className="bg-[#E5D8CA] flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-black mb-8 mx-auto">
                            About me
                        </h2>
                        <div className="bg-white w-[80dvh] mx-auto h-80 rounded-lg shadow-lg px-6">
                            {/* เนื้อหาภายในกล่อง */}
                        </div>
                        <h2 className="text-3xl font-bold text-black mt-10 mb-8 mx-auto">
                            Resume / CV
                        </h2>
                        <div className="bg-white w-[80dvh] mx-auto h-80 rounded-lg shadow-lg px-6 mb-8">
                            {/* เนื้อหาภายในกล่อง */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
