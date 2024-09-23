"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { UserInfo } from "../UserInfo";
import LoadingPage from "src/components/global/LoadingPage";
import { useUserData } from "src/context/useUserData";

type Props = {};

export default function UserProfile({}: Props) {
    // เปลี่ยนชื่อเป็น UserProfile
    const { user, loading } = useUserData();
    const [content, setContent] = useState<string>("");
    useEffect(() => {
        if (user) {
            setContent(user.aboutMe ?? "");
        }
    }, [user]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <div className="flex items-start">
                <div className="w-full">
                    <UserInfo user={user || undefined} />
                    <div className="flex items-center justify-center">
                        <div className="mt-10 flex items-start">
                            <Image
                                src={user?.profileImageUrl || ""} // Replace with your image path
                                alt="Profile"
                                className="h-64 w-64 rounded-full object-cover"
                                width={256}
                                height={256}
                            />
                        </div>

                        <div className="mb-6 ml-20 text-3xl text-black">
                            <p>{user?.address[0]?.country}</p>
                            <p>
                                Website:{" "}
                                <a href="https://wtchai.com" className="text-blue-600">
                                    https://wtchai.com
                                </a>
                            </p>
                        </div>
                        <div className="ml-20 flex flex-col space-y-6">
                            <a
                                href={user?.contact.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-3xl text-blue-700"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-3xl text-blue-500"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href={user?.contact.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-3xl text-red-600"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="mx-auto mb-8 text-3xl font-bold text-black">About me</h2>
                        <div className="mx-auto w-[80dvh] rounded-lg bg-white px-6 shadow-lg">
                            <div
                                className="ql-editor preview-content !p-0"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                        <h2 className="mx-auto mb-8 mt-10 text-3xl font-bold text-black">
                            Resume / CV
                        </h2>
                        <div className="mx-auto mb-8 h-80 w-[80dvh] rounded-lg bg-white px-6 shadow-lg">
                            {/* เนื้อหาภายในกล่อง */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
