"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ButtonSeeMore from "./ButtonSeeMore";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";
import { pagePath } from "src/constants/routePath";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";
import { UserInfo } from "../UserInfo";

type Props = {};

export default function MyProject({}: Props) {
    // เปลี่ยนชื่อเป็น UserProfile
    const [user, setUser] = useState<UserData>();
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
                setUser(result.data);
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
        <section>
            <div className=" bg-orang-50 flex items-start">
                <div className="w-full">
                    <UserInfo user={user} />
                </div>
            </div>
            <div className=" bg-orang-50 flex items-start">
                <div className="w-full">
                    <h1 className="text-5xl text-black text-left mt-20 ml-40">My Project</h1>
                </div>
            </div>
            <CarouselProductCard title="" data={user?.ownProjects} showEditProject />
            {/* <ButtonSeeMore/> */}
        </section>
    );
}
