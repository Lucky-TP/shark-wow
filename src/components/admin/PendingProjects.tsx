"use client"
import { useEffect, useState } from "react";
import { getPendingProjects } from "src/services/apiService/admin/getPendingProjects";
import { approve } from "src/services/apiService/admin/approve";
import { reject } from "src/services/apiService/admin/reject";
import { ShowProject } from "src/interfaces/datas/project";
import LoadingPage from "../global/LoadingPage";
import { useRouter } from "next/navigation";

export default function PendingProjects() {
    const router = useRouter();
    const [projects, setProjects] = useState<ShowProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPendingProjects = async () => {
            try {
                const response = await getPendingProjects();
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch pending projects");
                setLoading(false);
            }
        };

        fetchPendingProjects();
    }, []);

    const handleViewProject = (projectId : string) => {
        setLoading(true);
        router.push(`/explore/${projectId}`);
        setLoading(false);
    };

    const handleApprove = async (projectId: string) => {
        try {
            await approve(projectId);
            setProjects(projects.filter(project => project.projectId !== projectId));
        } catch (err) {
            console.error("Failed to approve project", err);
        }
    };

    const handleReject = async (projectId: string) => {
        try {
            await reject(projectId);
            setProjects(projects.filter(project => project.projectId !== projectId));
        } catch (err) {
            console.error("Failed to reject project", err);
        }
    };

    if (loading) return <LoadingPage />;
    if (error) return <p>{error}</p>;

    return (
        <div className="px-40">
            <h1 className="text-4xl mb-4 font-bold">Pending Projects</h1>
            {projects.map((project) => (
                <>
                <div key={project.projectId} className="p-4 border rounded-md shadow-md flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={project.carouselImageUrls[0] || "/sharkDefaultProfilePic.webp"}
                            alt={project.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-bold text-lg">{project.name}</h3>
                            </div>
                            <button
                                className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-full w-fit"
                                onClick={() => handleViewProject(project.projectId)} // Pass a function that calls handleViewProject
                            >
                                View Project
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => handleApprove(project.projectId)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleReject(project.projectId)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </div>
                </div>
                <div className="w-full mt-10 flex justify-center">
                    <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
                </div>
                </>
            ))}
        </div>
    );
}
