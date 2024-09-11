"use client";
import { useRouter } from "next/navigation";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { pagePath } from "src/constants/routePath";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";
type Props = {};

export default function Setting_Navbar3({}: Props) {
    const [user, setUser] = useState<UserData | null>();
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
                setUser(result.data || null);
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
    return (
        <div>
            <section>
                <div className=" bg-[#E5D8CA] flex items-start">
                    <div className="w-full">
                        <h1 className="text-7xl  text-black text-left ml-40 mt-20">chai skibidi</h1>
                        <div className="flex items-start ml-40 space-x-10 mt-20">
                            <button
                                className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"
                                onClick={() => router.push("/profiletoy")}
                            >
                                Profile
                            </button>
                            <button
                                className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"
                                onClick={() => router.push("/my-project")}
                            >
                                Password
                            </button>
                            <button
                                className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"
                                onClick={() => router.push("/contribution")}
                            >
                                Subscription
                            </button>
                            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                                Address
                            </button>
                            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                                Interest
                            </button>
                        </div>
                        <hr className="border-t-4 border-black w-4/5 my-8 ml-40" />
                    </div>
                </div>
            </section>
        </div>
    );
}
