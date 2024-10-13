"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
//import { UserInfo } from "../UserInfo"; // Import UserInfo component
import LoadingPage from "src/components/global/LoadingPage"; // Import loading component
import { getUserById } from "src/services/apiService/users/getUserById"; // Import your API service
import { message } from "antd"; // Optional, if you want to show error messages
import { CalendarTwoTone, EnvironmentTwoTone } from "@ant-design/icons";

type Props = {
    uid: string; // Expecting a user ID as a prop
};

// Function to calculate age from birthDate string
const calculateAge = (birthDateString: string): number | string => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age <= 0 ? "" : age;
};

export default function GenericUserProfile({ uid }: Props) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("Fetching user with ID:", uid); // Log the uid for debugging
            setLoading(true); // Set loading to true
            try {
                const response = await getUserById(uid); // Fetch user data by ID
                if (response.data) {
                    setUser(response.data);
                    setContent(response.data.aboutMe ?? "");
                } else {
                    message.error("User not found."); // Handle case when user not found
                }
            } catch (error) {
                console.error(error);
                message.error("Failed to load user data."); // Show error if the fetch fails
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchUserData(); // Call the fetch function
    }, [uid]);

    if (loading) {
        return <LoadingPage />; // Show loading page while fetching
    }

    const userAge = user?.birthDate ? calculateAge(user.birthDate) : "N/A"; // Calculate age

    return (
        <div>
            <div className="flex items-start">
                <div className="w-full">
                    <div className="flex h-full items-start justify-center">
                        {/* Profile Image */}
                        <div className="mt-10 flex items-start">
                            <Image
                                src={user?.profileImageUrl || ""} // Replace with your image path
                                alt="Profile"
                                className="h-64 w-64 rounded-full object-cover"
                                width={256}
                                height={256}
                            />
                        </div>

                        {/* User Information */}
                        <div className="ml-20 mt-24 items-start space-y-2 text-3xl text-black">
                            <p>
                                {user?.firstName} {user?.lastName}
                            </p>
                            {/* Age always shown with a static Calendar icon */}
                            <p>
                                <CalendarTwoTone twoToneColor="#f57c00" className="pr-2" />
                                {userAge ? `Age: ${userAge}` : ""}
                            </p>
                            {/* Address always shown with a static Environment icon */}
                            <p>
                                <EnvironmentTwoTone twoToneColor="#f57c00" className="pr-2" />
                                {user?.address[0]?.city && user?.address[0]?.country
                                    ? `${user.address[0].city}, ${user.address[0].country}`
                                    : ""}
                            </p>
                        </div>

                        {/* Social Media Icons (Vertically aligned at the top) */}
                        <div className="mt-24 flex h-auto flex-col items-start space-y-4 pl-20">
                            {user?.contact.facebook && (
                                <a
                                    href={user.contact.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-3xl text-blue-700"
                                >
                                    <FaFacebook />
                                </a>
                            )}
                            {user?.contact.X && (
                                <a
                                    href={user.contact.X}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-3xl text-blue-500"
                                >
                                    <FaTwitter />
                                </a>
                            )}
                            {user?.contact.youtube && (
                                <a
                                    href={user.contact.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-3xl text-red-600"
                                >
                                    <FaYoutube />
                                </a>
                            )}
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
