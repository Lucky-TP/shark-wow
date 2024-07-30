"use client"
import Link from 'next/link';
import React from 'react';

import { useEffect, useState } from "react";
import { useAuth } from "src/utils/useAuth";
import { useRouter } from "next/navigation";
import { UserModel } from "src/interfaces/models/user";
import { apiPath, pagePath } from "src/constants/routePath";
import axios, { AxiosResponse } from "axios";
import { GetUserResponse } from "src/interfaces/response/userResponse";
import { signOut } from 'src/services/authService';
import { Dropdown } from 'antd';

type Props = {}

export default function Navbar({}: Props) {
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState<boolean>(false);
    const { user: authUser, authLoading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<GetUserResponse> = await axios.get(apiPath.USERS.GET_SELF);
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
            setLoading(false);
            }
        };
        if (!authLoading) {
            fetchUserProfile();
        }
    }, [authLoading, authUser]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error: any) {
            console.error("Error signing out:", error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <nav className='px-[3vw] bg-gray-200 shadow-md py-[2vh]'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex items-center'>
                        <Link href="/">
                            <img src='/assets/shark.png' className='w-[40px] h-[40px] rounded-full' alt="SharkWow Logo" />
                        </Link>
                    </div>
                    <ul className='flex flex-row gap-x-[3vw] items-center'>
                        <li>
                            <Link href="/create-project" className='text-gray-800 hover:text-blue-500'>CREATE PROJECT</Link>
                        </li>
                        <li>
                            <Link href="/catagories" className='text-gray-800 hover:text-blue-500'>CATAGORIES</Link>
                        </li>
                        <li>
                            {!user && (
                                <Link href="/sign-in" className='text-gray-800 hover:text-blue-500'>SIGN IN / SIGN UP</Link>
                            )}
                            {user && (
                            <Dropdown
                                menu={{items: [
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
                                    }
                                ]}}
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
  )
}