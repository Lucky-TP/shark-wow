"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { pagePath } from "src/constants/routePath";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";
type Props = {};

export default function SettingNavbar({}: Props) {
    const [user, setUser] = useState<UserData | null>(null);
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
    }, [authUser, authLoading, router]);

    return (
        <div>
            <section>
                <div className="flex items-start">
                    <div className="w-full">
                        <h1 className="ml-40 mt-20 text-start text-7xl text-black">
                            {user?.username || "Loading..."}
                        </h1>
                        <div className="ml-40 mt-20 flex items-start justify-start space-x-10">
                            <button
                                className="rounded-xl bg-[#D2825E] px-16 py-2 text-xl font-semibold text-white"
                                onClick={() => router.push("/settings/profile-config")}
                            >
                                Profile
                            </button>
                            <button
                                className="rounded-xl bg-[#D2825E] px-16 py-2 text-xl font-semibold text-white"
                                onClick={() => router.push("/settings/address")}
                            >
                                Address
                            </button>
                            <button
                                className="rounded-xl bg-[#D2825E] px-16 py-2 text-xl font-semibold text-white"
                                onClick={() => router.push("/settings/preferences")}
                            >
                                Interest
                            </button>
                        </div>
                        <hr className="my-8 ml-40 w-4/5 border-t-4 border-black" />
                    </div>
                </div>
            </section>
        </div>
    );
}
