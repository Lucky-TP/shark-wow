"use client";
import Link from "next/link";
import React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiPath } from "src/constants/routePath";
import axios, { AxiosResponse } from "axios";
import { GetUserResponse } from "src/interfaces/response/userResponse";
import { signOut } from "src/services/authService";
import { Dropdown } from "antd";
import { IS_COOKIE_SET } from "src/constants/sessionStorageKeyName";
import Image from "next/image";
import { UserDataWithDate } from "src/interfaces/models/common";

type Props = {};

export default function Navbar({}: Props) {
    const checkCookieSet = () => {
        let value: string | null = null;
        if (typeof window !== "undefined") {
            value = sessionStorage.getItem(IS_COOKIE_SET);
        }
        if (value) {
            return true;
        } else {
            return false;
        }
    };

    const [user, setUser] = useState<UserDataWithDate | null>();
    const router = useRouter();
    const [isCookieSet, setIsCookieSet] = useState<boolean>(checkCookieSet());

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response: AxiosResponse<GetUserResponse> =
                    await axios.get(apiPath.USERS.GET_SELF);
                setUser(response.data.data);
            } catch (error) {
                setUser(null);
                console.error("Error fetching user profile:", error);
            }
        };
        if (isCookieSet) {
            fetchUserProfile();
        } else {
            setUser(null);
        }
    }, [isCookieSet]);

    useEffect(() => {
        const interval = setInterval(() => {
            const value = checkCookieSet();
            setIsCookieSet(value);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.refresh();
            router.push("/");
        } catch (error: any) {
            console.error("Error signing out:", error.message);
        }
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <section>
            <nav className="px-[3vw] bg-gray-200 shadow-md py-[2vh]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src="/assets/shark.png"
                                className="w-[40px] h-[40px] test rounded-full"
                                alt="SharkWow Logo"
                                width={40}
                                height={40}
                            />
                        </Link>
                    </div>
                    <ul className="flex flex-row gap-x-[3vw] items-center">
                        <li>
                            <Link
                                href="/create-project"
                                className="text-gray-800 hover:text-blue-500"
                            >
                                CREATE PROJECT
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/catagories"
                                className="text-gray-800 hover:text-blue-500"
                            >
                                CATAGORIES
                            </Link>
                        </li>
                        <li>
                            {!user && (
                                <Link
                                    href="/sign-in"
                                    className="text-gray-800 hover:text-blue-500"
                                >
                                    SIGN IN / SIGN UP
                                </Link>
                            )}
                            {user && (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: "1",
                                                label: (
                                                    <div
                                                        onClick={handleSignOut}
                                                    >
                                                        sign out
                                                    </div>
                                                ),
                                                danger: true,
                                            },
                                        ],
                                    }}
                                >
                                    <img
                                        src={user.profileImageUrl}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="rounded-full w-12 h-12"
                                    />
                                </Dropdown>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
    );
}
