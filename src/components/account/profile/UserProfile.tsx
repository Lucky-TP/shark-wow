"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { UserInfo } from "../UserInfo";
import LoadingPage from "src/components/global/LoadingPage";
import { useUserData } from "src/context/useUserData";
//import { Viewer } from "@react-pdf-viewer/core";
//import "@react-pdf-viewer/core/lib/styles/index.css";

type Props = {};

// Function to calculate age from birthDate string
const calculateAge = (birthDateString: string): number | string => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 0) return "N/A";
    return age;
};

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

    const userAge = user?.birthDate ? calculateAge(user.birthDate) : "N/A"; // Calculate age or show "N/A" if birthDate is not available

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
                            <p>Age: {userAge} </p> {/* Display the calculated age */}
                            <p>Country: {user?.address[0]?.country}</p>
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
                                href={user?.contact.X}
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
                    <div className="mt-10 flex flex-col justify-center">
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
                        <div className="mx-auto mb-8 w-[80dvh] overflow-hidden rounded-lg shadow-lg">
                            {user?.cvUrl && (
                                <iframe
                                    src={`${user.cvUrl}#toolbar=0&navpanes=0`}
                                    className="h-[700px] w-full" // Adjust height as needed for more pages
                                    style={{ border: "none", overflow: "auto" }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
