"use client";
import Image from "next/image";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSection from "src/components/global/LoadingSection";
import { useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";
import { deleteProject } from "src/services/apiService/projects/deleteProject";

interface Project {
    id: string;
    title: string;
    image: string;
    stage: string;
    amount: number;
    currency: string;
    supporters: number;
    daysLeft: number;
}

const projects: Project[] = [
    {
        id: "1",
        title: "Purple Violet Light",
        image: "/assets/shark.png",
        stage: "Stage 1: Concept",
        amount: 5000,
        currency: "USD",
        supporters: 6969,
        daysLeft: 43,
    },
    {
        id: "2",
        title: "Skibidi Turbo",
        image: "/assets/shark.png",
        stage: "Stage 1: Concept",
        amount: 5000,
        currency: "USD",
        supporters: 6969,
        daysLeft: 43,
    },
    {
        id: "3",
        title: "Pumpkin Cat",
        image: "/assets/shark.png",
        stage: "Stage 1: Concept",
        amount: 5000,
        currency: "USD",
        supporters: 6969,
        daysLeft: 43,
    },
    {
        id: "4",
        title: "Toey Car",
        image: "/assets/shark.png",
        stage: "Stage 1: Concept",
        amount: 5000,
        currency: "USD",
        supporters: 6969,
        daysLeft: 43,
    },
];

export default function ProjectsDrafted() {
    const router = useRouter(); // Initialize router
    const [isLoading, setIsLoading] = useState(false);
    const { payload, OnGettingProjectCreatedByCreator, OnChangeProjectStageType } =
        useProjectsCreatedByCreator();
    const handleEditProject = (projectId: string) => {
        setIsLoading(true);
        router.push(`/create-project/${projectId}/basic`); // Push to the desired route
        setIsLoading(false);
    };

    const [deleting, setDeleting] = useState(false);
    const showDeleteConfirmModal = (projectId: string) => {
        Modal.confirm({
            title: "Confirm Project Deletion",
            content: "Are you sure you want to delete this project? This action cannot be undone.",
            okText: "Yes",
            cancelText: "No",
            centered: true,
            onOk: () => {
                handleDeleteProject(projectId);
            },
        });
    };

    const handleDeleteProject = async (projectId: string) => {
        if (deleting) {
            return;
        }
        setDeleting(true);
        try {
            const response = await deleteProject(projectId);
            message.success(response.message || "Project deleted successfully");
            window.location.reload();
        } catch (error: unknown) {
            message.error((error as Error).message || "Delete project failed");
        } finally {
            setDeleting(false);
        }
    };

    if (
        !payload ||
        !payload.ProjectsCreatedByCreator ||
        !payload.ProjectsCreatedByCreator.drafted
    ) {
        return <LoadingSection />; // Handle loading or undefined data
    }

    if (payload.ProjectsCreatedByCreator.drafted.length == 0) {
        return (
            <div className="m-0 w-full p-0">
                <hr className="mb-[4vh] w-full border-t-4 border-gray-600" />
                <div className="flex w-full justify-center text-xl font-semibold">
                    No Drafted Project{" "}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="space-y-4">
                {payload.ProjectsCreatedByCreator.drafted.map((project) => (
                    <div key={project.projectId}>
                        <hr className="mb-[4vh] w-full border-t-4 border-gray-600" />
                        <div className="rounded-none bg-orange-50 shadow-none">
                            <div className="flex flex-col items-center justify-between gap-8 p-4 md:flex-row">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="relative aspect-square w-[150px]">
                                        <Image
                                            src={project.previewImageUrl}
                                            alt={project.name}
                                            fill
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="w-[20vw]">
                                        <h3 className="pb-4 text-xl font-semibold">
                                            {project.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 px-8 md:flex-row">
                                    <button
                                        className="rounded-md bg-orange-400 px-9 py-2 font-semibold text-white hover:bg-orange-500"
                                        onClick={() => handleEditProject(project.projectId)}
                                    >
                                        Edit Project
                                    </button>

                                    <button
                                        className="rounded-md bg-red-400 px-9 py-2 font-semibold text-white hover:bg-red-500"
                                        onClick={() => showDeleteConfirmModal(project.projectId)}
                                    >
                                        Delete Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
