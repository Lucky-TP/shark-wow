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
        try {
            setLoading(true);
            const result = await createProject();
            const projectId = result.data; // Get the project ID from response
            router.push(`/create-project/${projectId}/basic`); // Navigate to the project page
        } catch (error: any) {
            setLoading(true);
            router.push(`/sign-in`)
            setLoading(false);
            console.error("Error creating project:", error.message);
        }
    };

    const handleProfile = async () => {
        router.push("/profile")
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
            <nav className="px-[3vw] bg-primary shadow-md py-[2vh]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src="/assets/NavbarIcon.svg"
                                alt="SharkWow Logo"
                                width={150}
                                height={150}
                            />
                        </Link>
                    </div>
                    <ul className="flex flex-row gap-x-[3vw] items-center">
                        <li>
                            <Link href="/explore" className="text-gray-800 hover:text-white">
                                EXPLORE
                            </Link>
                        </li>
                        <li>
                            <Button
                                type="link"
                                onClick={handleCreateProject}
                                loading={loading}
                            >
                                <span className="text-gray-800 hover:text-white">
                                    CREATE PROJECT
                                </span>
                            </Button>
                        </li>
                        <li>
                            {!user && (
                                <Link href="/sign-in" className="text-gray-800 hover:text-white">
                                    SIGN IN / SIGN UP
                                </Link>
                            )}
                            {user && (
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: "1",
                                                label: <div onClick={handleProfile}>Profile</div>,
                                            },
                                            {
                                                key: "2",
                                                label: <div onClick={handleSignOut}>sign out</div>,
                                                danger: true,
                                            },
                                        ],
                                    }}
                                >
                                    <Image
                                        src={user.profileImageUrl || ""}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="rounded-full w-12 h-12"
                                        width={150}
                                        height={150}
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
