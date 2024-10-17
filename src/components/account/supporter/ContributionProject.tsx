"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSection from "src/components/global/LoadingSection";
import { getSupporterSummaryProjects } from "src/services/apiService/users/getSupporterSummaryProjects";
import { ExtendProjectPreview } from "src/interfaces/datas/project";

function formatOwnerShip(goalStageFunding: number, goalProjectFunding: number) {
    return (goalStageFunding / goalProjectFunding) * 100;
}

export default function ContributionProject() {
    const [loading, setLoading] = useState<boolean>(true);
    const [contributedProjects, setContributedProjects] = useState<ExtendProjectPreview[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSupporterSummaryProjects();
                setContributedProjects(result.data.contributed);
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
                {contributedProjects.map((project) => (
                    <div key={project.projectId}>
                        <hr className="mb-[2vh] w-full border-t-4 border-gray-600" />
                        <div className="rounded-none bg-orange-50 shadow-none">
                            <div className="flex justify-between p-4">
                                <div className="flex w-full space-x-4">
                                    <div className="flex-row">
                                        <img
                                            src={project.previewImageUrl}
                                            alt={project.name}
                                            className="mb-4 h-[20vh] w-[13vw] rounded object-cover"
                                        />
                                        <button
                                            className="w-full rounded-md bg-orange-400 px-4 py-2 font-semibold text-white hover:bg-orange-500"
                                            onClick={() => handleViewProject(project.projectId)}
                                        >
                                            View Project
                                        </button>
                                    </div>
                                    <div className="w-[20vw]">
                                        <div className="truncate whitespace-nowrap pb-2 text-2xl font-extrabold">
                                            {project.name}
                                            <div className="text-sm font-thin text-gray-500">
                                                created by {project.projectOwnerUsername}
                                            </div>
                                        </div>
                                        <div className="flex-row justify-between">
                                            <div className="text-base font-normal text-green-500">
                                                In current stage:{" "}
                                                {stageLabels[project.currentStage.stageId]}
                                            </div>
                                            <div className="text-base font-normal text-green-500">
                                                Stage time remaining:{" "}
                                                {calculateDaysLeft(project.currentStage.expireDate)}{" "}
                                                days
                                            </div>
                                            <div className="text-base font-normal text-red-500">
                                                Project time remaining:{" "}
                                                {calculateDaysLeft(project.stages[2]?.expireDate)}{" "}
                                                days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[40vw] space-y-2">
                                    <div className="">
                                        <div className="flex-row">
                                            <div className="flex">
                                                <div className="mr-2 w-[15vw] pb-2 text-xl font-bold">
                                                    Fund: {project.costPerQuantity} Baht
                                                </div>
                                                <div className="ml-2 w-[15vw] pb-2 text-xl font-bold">
                                                    Ownership:{" "}
                                                    {formatOwnerShip(
                                                        project.currentStage.goalFunding, //project.stage[0].goalFunding + project.stage[1].goalFunding + project.stage[2].goalFunding  
                                                        (project.totalQuantity ?? 0) *
                                                            (project.costPerQuantity ?? 0)
                                                    ).toFixed()}{" "}
                                                    %
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="flex-row">
                                                    <div className="pb-2 text-xl">
                                                        Funded at: Concept (
                                                        {formatOwnerShip(
                                                            project.currentStage.goalFunding,
                                                            (project.totalQuantity ?? 0) *
                                                                (project.costPerQuantity ?? 0)
                                                        ).toFixed()}{" "}
                                                        %)
                                                    </div>
                                                    {/* <div className="pb-2 text-xl">Funded at: Production (50%)</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
