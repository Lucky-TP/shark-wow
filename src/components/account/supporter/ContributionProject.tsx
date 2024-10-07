"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSection from "src/components/global/LoadingSection";

import { GetSupporterSummaryProjects } from "src/interfaces/response/userResponse";
import { getSupporterSummaryProjects } from "src/services/apiService/users/getSupporterSummaryProjects";
import { getProjectById } from "src/services/apiService/projects/getProjectById"; // Second fetch
import { GetProjectResponse } from "src/interfaces/response/projectResponse";

export default function ContributionProject() {
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
                const projectDetailsPromises = data.data.contributed.map(async (project) => {
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
                {supporterSummary?.data.contributed.map((project, index) => (
                    <div key={project.projectId}>
                        <hr className="border-t-4 border-gray-600 w-full mb-[2vh]" />
                        <div className="bg-orange-50 rounded-none shadow-none">
                            <div className="p-4 flex justify-between">
                                <div className="flex w-full space-x-4">
                                    <div className="flex-row">
                                        <img
                                            src={project.previewImageUrl}
                                            alt={project.name}
                                            className="mb-4 w-[13vw] h-[20vh] object-cover rounded"
                                        />
                                        <button
                                            className="font-semibold py-2 px-4 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500"
                                            onClick={() => handleViewProject(project.projectId)}
                                        >
                                            View Project
                                        </button>
                                    </div>
                                    <div className="w-[20vw]">
                                        <div className="pb-2 font-extrabold text-2xl truncate whitespace-nowrap">
                                            {project.name}
                                            <div className="font-thin text-sm text-gray-500">
                                                created by {project.projectOwnerUsername}
                                            </div>
                                        </div>
                                        <div className="flex-row justify-between">
                                            <div className="font-normal text-base text-green-500">
                                                In current stage: {stageLabels[project.currentStage.stageId]}
                                            </div>
                                            <div className="font-normal text-base text-green-500">
                                                Stage time remaining: {calculateDaysLeft(project.currentStage.expireDate)}{" "}
                                                days
                                            </div>
                                            <div className="font-normal text-base text-red-500">
                                                Project time remaining: {calculateDaysLeft(project.stages[2]?.expireDate)}{" "}
                                                days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 w-[40vw]">
                                    <div className="">
                                        <div className="flex-row">
                                            <div className="flex">
                                                <div className="pb-2 font-bold text-xl mr-2 w-[15vw]">
                                                    Fund: {project.currentStage.fundingCost} Baht
                                                </div>
                                                <div className="pb-2 font-bold text-xl ml-2 w-[15vw]">
                                                    Ownership: 70%
                                                </div>
                                            </div>
                                            <div className="flex">
                                                
                                                <div className="flex-row">
                                                    <div className="pb-2 text-xl">Funded at: Prototype (20%)</div>
                                                    <div className="pb-2 text-xl">Funded at: Production (50%)</div>
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
