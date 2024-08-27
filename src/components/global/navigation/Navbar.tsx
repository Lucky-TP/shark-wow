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
import Image from "next/image";
import { UserData } from "src/interfaces/models/common";
import { useAuth } from "src/hooks/useAuth";
import { getSelf } from "src/services/apiService/users/getSelf";

type Props = {};

export default function Navbar({}: Props) {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>();
    const { user: userHook } = useAuth();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const result = await getSelf();
                setUser(result.data);
            } catch (error: any) {
                setUser(null);
            }
        };
        if (userHook) {
            fetchUserProfile();
        } else {
            setUser(null);
        }
    }, [userHook, setUser]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error: any) {
            console.error("Error signing out:", error.message);
        }
    };

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
