"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSection from "src/components/global/LoadingSection";

import { GetSupporterSummaryProjects } from "src/interfaces/response/userResponse";
import { getSupporterSummaryProjects } from "src/services/apiService/users/getSupporterSummaryProjects";
import { getProjectById } from "src/services/apiService/projects/getProjectById"; // Second fetch
import { GetProjectResponse } from "src/interfaces/response/projectResponse";

function formatOwnerShip(goalStageFunding : number , goalProjectFunding : number ){
    return (goalStageFunding/goalProjectFunding)*100
}


export default function FavoriteProject() {
    const [loading, setLoading] = useState<boolean>(true);
    const [supporterSummary, setSupporterSummary] = useState<GetSupporterSummaryProjects | null>(null);
    const [projectDetailsData, setProjectDetails] = useState<GetProjectResponse[]>([]); // New state for second fetch data
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First fetch: supporter summary
                console.log("Fetching supporter summary...");
                const data = await getSupporterSummaryProjects();
                setSupporterSummary(data);
                console.log("Supporter summary fetched:", data); // Log first fetch data
    
                // Second fetch: Use projectId from first fetch
                console.log("Fetching project details...");
                const projectDetailsPromises = data.data.favorited.map(async (project) => {
                    return await getProjectById(project.projectId); // Fetch detailed data using projectId
                });
    
                const projectDetailsData = await Promise.all(projectDetailsPromises); // Fetch all details in parallel
                setProjectDetails(projectDetailsData); // Store the second fetch data
                console.log("Project details fetched:", projectDetailsData); // Log second fetch data
    
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
        <div className="w-full m-0 p-0">
            <div className="space-y-4">
                {supporterSummary?.data.favorited.map((favoriteProject, index) => {
                    const isContributed = supporterSummary?.data.contributed.some(
                        (contribProject) => contribProject.projectId === favoriteProject.projectId
                    );

                    return (
                        <div key={index}>
                            <hr className="border-t-4 border-gray-600 w-full mb-[2vh]" />
                            <div className="bg-orange-50 rounded-none shadow-none">
                                <div className="p-4 flex justify-between">
                                    <div className="flex w-full space-x-4">
                                        <div className="flex-row">
                                            <img
                                                src={favoriteProject.previewImageUrl}
                                                alt={favoriteProject.name}
                                                className="mb-4 w-[13vw] h-[20vh] object-cover rounded"
                                            />
                                            <button
                                                className="font-semibold py-2 px-4 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500"
                                                onClick={() => handleViewProject(favoriteProject.projectId)}
                                            >
                                                View Project
                                            </button>
                                        </div>
                                        <div className="w-[20vw]">
                                            <div className="truncate whitespace-nowrap pb-2 text-2xl font-extrabold">
                                                {favoriteProject.name}
                                            </div>
                                            <div className="flex-row justify-between">
                                                <div className="font-normal text-base text-green-500">
                                                    In current stage: {stageLabels[favoriteProject.currentStage.stageId]}
                                                </div>
                                                <div className="font-normal text-base text-green-500">
                                                    Stage time remaining: {calculateDaysLeft(favoriteProject.currentStage.expireDate)}
                                                    days
                                                </div>
                                                <div className="font-normal text-base text-red-500">
                                                    Stage time remaining: {calculateDaysLeft(favoriteProject.stages[2].expireDate)}
                                                    days
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 w-[40vw]">
                                        {isContributed ? (
                                            <div>
                                                <div className="">
                                                    <div className="flex-row">
                                                        <div className="flex">
                                                            <div className="pb-2 font-bold text-xl mr-2 w-[15vw]">
                                                                Fund: {favoriteProject.contributedStages.reduce((sum, stage) => sum + stage.fundingCost, 0)} Baht
                                                            </div>
                                                            <div className="pb-2 font-bold text-xl ml-2 w-[15vw]">
                                                                Ownership: {formatOwnerShip(
                                                                                favoriteProject.contributedStages.reduce((total, stage) => total + stage.goalFunding, 0), // Summing the goalFunding of all contributed stages
                                                                                (favoriteProject.totalQuantity ?? 0) * (favoriteProject.costPerQuantity ?? 0)
                                                                            ).toFixed()}{" "}
                                                                            %
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            
                                                            <div className="flex-row">
                                                            <div className="pb-2 text-xl">
                                                            {favoriteProject.contributedStages.map((stage, index) => (
                                                                <div key={index}>
                                                                    Funded at: {stageLabels[stage.stageId]}{" "}
                                                                    {formatOwnerShip(
                                                                        stage.goalFunding,
                                                                        (favoriteProject.totalQuantity ?? 0) *
                                                                            (favoriteProject.costPerQuantity ?? 0)
                                                                    ).toFixed()}{" "}% 
                                                                </div>
                                                            ))}
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
