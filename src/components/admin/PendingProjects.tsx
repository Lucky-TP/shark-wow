"use client";
import { useEffect, useState } from "react";
import { getPendingProjects } from "src/services/apiService/admin/getPendingProjects";
import { approve } from "src/services/apiService/admin/approve";
import { reject } from "src/services/apiService/admin/reject";
import { ShowProject } from "src/interfaces/datas/project";
import LoadingPage from "../global/LoadingPage";
import { useRouter } from "next/navigation";
import { Modal, Alert } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"; // Add Ant Design icon for approval
import { getCurrentStage } from "src/utils/api/projects";

export default function PendingProjects() {
    const router = useRouter();
    const [projects, setProjects] = useState<ShowProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isApproveModalVisible, setIsApproveModalVisible] = useState<boolean>(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState<boolean>(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    useEffect(() => {
        const fetchPendingProjects = async () => {
            try {
                const response = await getPendingProjects();
                console.log(response.data);
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch pending projects");
                setLoading(false);
            }
        };

        fetchPendingProjects();
    }, []);

    const handleViewProject = (projectId: string) => {
        setLoading(true);
        router.push(`/explore/${projectId}`);
        setLoading(false);
    };

    const handleApprove = async (projectId: string) => {
        try {
            await approve(projectId);
            setProjects(projects.filter((project) => project.projectId !== projectId));
            setIsApproveModalVisible(false); // Close the modal after approving
        } catch (err) {
            console.error("Failed to approve project", err);
        }
    };

    const handleReject = async (projectId: string) => {
        try {
            await reject(projectId);
            setProjects(projects.filter((project) => project.projectId !== projectId));
            setIsRejectModalVisible(false); // Close the modal after rejecting
        } catch (err) {
            console.error("Failed to reject project", err);
        }
    };

    const showApproveModal = (projectId: string) => {
        setSelectedProjectId(projectId); // Store project ID for later use
        setIsApproveModalVisible(true); // Open the approval modal
    };

    const showRejectModal = (projectId: string) => {
        setSelectedProjectId(projectId); // Store project ID for later use
        setIsRejectModalVisible(true); // Open the rejection modal
    };

    const handleApproveModalOk = () => {
        if (selectedProjectId) {
            handleApprove(selectedProjectId); // Approve the selected project
        }
    };

    const handleRejectModalOk = () => {
        if (selectedProjectId) {
            handleReject(selectedProjectId); // Reject the selected project
        }
    };

    const handleModalCancel = () => {
        setIsApproveModalVisible(false); // Close approval modal
        setIsRejectModalVisible(false); // Close rejection modal
    };

    if (loading) return <LoadingPage />;
    if (error) return <p>{error}</p>;
    
    const whichStage = (project: ShowProject) => {
        const stages = project.stages.map((stage) => stage.currentFunding === stage.goalFunding);
        
        if (!stages[0] && !stages[1] && !stages[2]) return <span>Approve Stage 1 Concept</span>;
        if (stages[0] && !stages[1] && !stages[2]) return <span>Stage 1 Concept to Stage 2 Prototype</span>;
        if (stages[0] && stages[1] && !stages[2]) return <span>Stage 2 Concept to Stage 3 Prototype</span>;
        if (stages[0] && stages[1] && stages[2]) return <span>Approve Stage 3 Prototype</span>;
        
    };
    
    return (
        <div className="px-40">
            <h1 className="text-4xl mb-4 font-bold">Pending Projects</h1>
            {projects.map((project) => (
                <div key={project.projectId} className="p-4 border rounded-md shadow-md flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={project.carouselImageUrls[0] || "/sharkDefaultProfilePic.webp"}
                            alt={project.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col ">
                            <h3 className="font-bold text-lg">{project.name}</h3>
                            <span className="mb-1 text-gray-600">{whichStage(project)}</span>  
                            <button
                                className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-full w-fit"
                                onClick={() => handleViewProject(project.projectId)}
                            >
                                View Project
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => showApproveModal(project.projectId)} // Show modal before approving
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => showRejectModal(project.projectId)} // Show modal before rejecting
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal for approving */}
            <Modal
                title={<div><CheckCircleOutlined style={{ color: "green" }} /> Confirm Approval</div>} // Add symbol for approve
                visible={isApproveModalVisible}
                centered // Center the modal
                onOk={handleApproveModalOk}
                onCancel={handleModalCancel}
                okText="Approve"
                cancelText="Cancel"
            >
                <p>Are you sure you want to approve this project?</p>
            </Modal>

            {/* Modal for rejecting */}
            <Modal
                title="Confirm Rejection"
                visible={isRejectModalVisible}
                centered // Center the modal
                onOk={handleRejectModalOk}
                onCancel={handleModalCancel}
                okText="Reject"
                cancelText="Cancel"
            >
                {/* Add alert inside rejection modal */}
                <Alert
                    message="Warning"
                    description="Once rejected, the project cannot be restored. Are you sure you want to reject this project?"
                    type="warning"
                    showIcon
                />
            </Modal>
        </div>
    );
}
