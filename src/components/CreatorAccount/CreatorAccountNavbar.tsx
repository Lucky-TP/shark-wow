"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserById } from "src/services/apiService/users/getUserById"; // Import your API service
import { message } from "antd"; // Optional, if you want to show error messages

type Props = {
    uid: string; // Expecting a user ID as a prop
};

export default function CreatorAccountNavbar({ uid }: Props) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await getUserById(uid); // Fetch user data by ID
                if (response.data) {
                    setUser(response.data);
                } else {
                    message.error("User not found."); // Handle case when user not found
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                message.error("Failed to load user data."); // Show error if the fetch fails
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile(); // Call the fetch function
    }, [uid]);

    return (
        <div>
            <section>
                <div className="flex items-start">
                    <div className="w-full">
                        <h1 className="mt-20 text-center text-7xl text-black">
                            {loading ? "Loading..." : user?.firstName + ' ' + user?.lastName || "User not found"}
                        </h1>
                        <div className="mt-20 flex items-center justify-center space-x-10">
                            <button
                                className="rounded-xl bg-[#D2825E] px-16 py-2 text-xl font-semibold text-white"
                                onClick={() => router.push(`/creator/${uid}/profile`)}
                            >
                                Profile
                            </button>
                            <button
                                className="rounded-xl bg-[#D2825E] px-16 py-2 text-xl font-semibold text-white"
                                onClick={() => router.push(`/creator/${uid}/supporter`)}
                            >
                                Supporter
                            </button>
                        </div>
                        <hr className="my-8 ml-40 w-4/5 border-t-4 border-black" />
                    </div>
                </div>
            </section>
        </div>
    );
}
