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
                <div className="flex flex-col items-start">
                    <div className="w-full">
                        <div className="px-[8vw] pt-6">
                            <h1 className="text-6xl text-gray-700">{user?.username}</h1>
                        </div>
                        <div className="flex w-full flex-row gap-x-[2vw] px-[7vw] py-[5vh]">
                            <button
                                className="rounded-xl bg-orange-400 px-[3vw] py-[1vh] text-lg font-semibold text-orange-50"
                                onClick={() => router.push("/settings/profile-config")}
                            >
                                Profile
                            </button>
                            <button
                                className="rounded-xl bg-orange-400 px-[3vw] py-[1vh] text-lg font-semibold text-orange-50"
                                onClick={() => router.push("/settings/address")}
                            >
                                Address
                            </button>
                            <button
                                className="rounded-xl bg-orange-400 px-[3vw] py-[1vh] text-lg font-semibold text-orange-50"
                                onClick={() => router.push("/settings/preferences")}
                            >
                                Interest
                            </button>
                        </div>
                        <div className="flex w-full justify-center">
                            <hr className="mb-[4vh] w-[86vw] border-t-4 border-gray-600" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
