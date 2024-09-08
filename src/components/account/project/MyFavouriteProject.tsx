"use client";
import React, { useEffect, useState } from "react";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";
import ButtonSeeMore from "./ButtonSeeMore";
import { useRouter } from "next/navigation";
import { pagePath } from "src/constants/routePath";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import { ShowProject } from "src/interfaces/datas/project";
type Props = {};
export default function MyFavouriteProject({}: Props) {
    const [user, setUser] = useState<UserData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [favoriteProjects, setFavoriteProjects] = useState<any[]>([]);
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

    useEffect(() => {
        const fetchFavoriteProjects = async () => {
            if (user?.favoriteProjectIds?.length) {
                try {
                    setLoading(true);
                    const projectPromises = user.favoriteProjectIds.map((id) =>
                        getProjectById(id)
                    );
                    const projectResults = await Promise.all(projectPromises);
                    setFavoriteProjects(
                        projectResults.map((result) => result.data)
                    );
                } catch (error) {
                    console.error("Error fetching favorite projects:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchFavoriteProjects();
        }
    }, [user]);

    return (
        <section>
            <div className=" bg-[#E5D8CA] flex items-start">
                <div className="w-full">
                    <h1 className="text-5xl text-black text-left mt-20 ml-40">
                        My Favourite Project
                    </h1>
                </div>
            </div>
            <CarouselProductCard title="" data={favoriteProjects} />
            {/* <ButtonSeeMore/> */}
        </section>
    );
}
