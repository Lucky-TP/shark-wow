"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSection from "src/components/global/LoadingSection";
import { ExtendProjectPreview } from "src/interfaces/datas/project";
import { getSupporterSummaryProjects } from "src/services/apiService/users/getSupporterSummaryProjects";

function formatOwnerShip(goalStageFunding: number, goalProjectFunding: number) {
    return (goalStageFunding / goalProjectFunding) * 100;
}

export default function FavoriteProject() {
    const [loading, setLoading] = useState<boolean>(true);
    const [favoritedProjects, setFavoritedProjects] = useState<ExtendProjectPreview[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSupporterSummaryProjects();
                setFavoritedProjects(result.data.favorited);
            } catch (error) {
                setError("Failed to load data.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateDaysLeft = (expireDate: string): number => {
        const today = new Date();
        const expirationDate = new Date(expireDate);
        const timeDifference = expirationDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysLeft >= 0 ? daysLeft : 0;
    };

    const handleViewProject = (projectId: string) => {
        setLoading(true);
        router.push(`/explore/${projectId}`);
        setLoading(false);
    };

    if (loading) {
        return <LoadingSection />;
    }

    if (error) {
        return <div>Error loading projects: {error}</div>;
    }

    const stageLabels = {
        0: "Concept",
        1: "Prototype",
        2: "Production",
        3: "Undefined",
    };

    return (
        <div className="m-0 w-full p-0">
            <div className="space-y-4">
                {favoritedProjects.map((favoritedProject) => {
                    const isContributed = favoritedProjects.some(
                        (contributedProject) =>
                            contributedProject.projectId === favoritedProject.projectId
                    );

                    return (
                        <div key={favoritedProject.projectId}>
                            <hr className="mb-[2vh] w-full border-t-4 border-gray-600" />
                            <div className="rounded-none bg-orange-50 shadow-none">
                                <div className="flex justify-between p-4">
                                    <div className="flex w-full space-x-4">
                                        <div className="flex-row">
                                            <img
                                                src={favoritedProject.previewImageUrl}
                                                alt={favoritedProject.name}
                                                className="mb-4 h-[20vh] w-[13vw] rounded object-cover"
                                            />
                                            <button
                                                className="w-full rounded-md bg-orange-400 px-4 py-2 font-semibold text-white hover:bg-orange-500"
                                                onClick={() =>
                                                    handleViewProject(favoritedProject.projectId)
                                                }
                                            >
                                                View Project
                                            </button>
                                        </div>
                                        <div className="w-[20vw]">
                                            <div className="truncate whitespace-nowrap pb-2 text-2xl font-extrabold">
                                                {favoritedProject.name}
                                            </div>
                                            <div className="flex-row justify-between">
                                                <div className="text-base font-normal text-green-500">
                                                    In current stage:{" "}
                                                    {
                                                        stageLabels[
                                                            favoritedProject.currentStage.stageId
                                                        ]
                                                    }
                                                </div>
                                                <div className="text-base font-normal text-green-500">
                                                    Stage time remaining:{" "}
                                                    {calculateDaysLeft(
                                                        favoritedProject.currentStage.expireDate
                                                    )}
                                                    days
                                                </div>
                                                <div className="text-base font-normal text-red-500">
                                                    Stage time remaining:{" "}
                                                    {calculateDaysLeft(
                                                        favoritedProject.stages[2].expireDate
                                                    )}
                                                    days
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[40vw] space-y-2">
                                        {isContributed ? (
                                            <div>
                                                <div className="">
                                                    <div className="flex-row">
                                                        <div className="flex">
                                                            <div className="mr-2 w-[15vw] pb-2 text-xl font-bold">
                                                                Fund:{" "}
                                                                {favoritedProject.costPerQuantity}{" "}
                                                                Baht
                                                            </div>
                                                            <div className="ml-2 w-[15vw] pb-2 text-xl font-bold">
                                                                Ownership:{" "}
                                                                {formatOwnerShip(
                                                                    favoritedProject.currentStage
                                                                        .goalFunding,
                                                                    (favoritedProject.totalQuantity ??
                                                                        0) *
                                                                        (favoritedProject.costPerQuantity ??
                                                                            0)
                                                                ).toFixed()}{" "}
                                                                %
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            <div className="flex-row">
                                                                <div className="pb-2 text-xl">
                                                                    Funded at: Concept (
                                                                    {formatOwnerShip(
                                                                        favoritedProject
                                                                            .currentStage
                                                                            .goalFunding,
                                                                        (favoritedProject.totalQuantity ??
                                                                            0) *
                                                                            (favoritedProject.costPerQuantity ??
                                                                                0)
                                                                    ).toFixed()}{" "}
                                                                    %)
                                                                </div>
                                                                {/* <div className="pb-2 text-xl">Funded at: Production (50%)</div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {/* Section 2: Render if projectId does not match */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
