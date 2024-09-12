"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Dropdown } from "antd";
import Image from "next/image";
import { signOut } from "src/services/authService";
import { getSelf } from "src/services/apiService/users/getSelf";
import { createProject } from "src/services/apiService/projects/createProject"; // Import your function
import { UserData } from "src/interfaces/datas/user";
import { useAuth } from "src/hooks/useAuth";

type Props = {};

export default function Navbar({}: Props) {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>();
    const [loading, setLoading] = useState(false);
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

    const handleCreateProject = async () => {
        setLoading(true);
        try {
            const result = await createProject();
            const projectId = result.data?.projectId; // Get the project ID from response
            router.push(`/create-project/${projectId}/basic`); // Navigate to the project page
        } catch (error: any) {
            router.push(`/sign-in`);
            console.error("Error creating project:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProfile = async () => {
        router.push("/profile");
    };

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
            <nav className="px-[3vw] bg-orange-50 shadow-md py-[2vh]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <Image
                                src="/assets/SharkwowLogo.png"
                                alt="SharkWow Logo"
                                width={200}
                                height={200}
                            />
                        </Link>
                    </div>
                    <ul className="flex flex-row gap-x-[3vw] items-center">
                        <li>
                            <Link
                                href="/explore"
                            >   
                                <h1
                                    className="text-orange-600 text-2xl font-semibold hover:text-orange-400 duration-700"
                                >
                                    EXPLORE
                                </h1>
                                
                            </Link>
                        </li>
                        <li>
                            <Button type="link" onClick={handleCreateProject} loading={loading}>
                                <span >
                                    <h1 className="text-orange-600 text-2xl font-semibold hover:text-orange-400 duration-700"> 
                                        CREATE PROJECT
                                    </h1>
                                </span>
                            </Button>
                        </li>
                        <li>
                            {!user && (
                                <Link
                                    href="/sign-in"
                                >
                                    <h1 className="text-orange-600 text-2xl font-semibold hover:text-orange-400 duration-700"> 
                                        SIGN IN / SIGN UP       
                                    </h1>
                                </Link>
                            )}
                            {user && (
                                <Dropdown
                                className="flex items-center"
                                    menu={{
                                        items: [
                                            {
                                                key: "1",
                                                label: <div onClick={handleProfile}>Profile</div>,
                                            },
                                            {
                                                key: "2",
                                                label: <div onClick={handleSignOut}>Sign Out</div>,
                                                danger: true,
                                            },
                                        ],
                                    }}
                                >
                                    <Image
                                        src={user.profileImageUrl || ""}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="rounded-full w-10 h-10"
                                        width={120}
                                        height={120}
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
