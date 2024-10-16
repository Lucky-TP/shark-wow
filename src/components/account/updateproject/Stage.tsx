"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; 
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import LoadingPage from "src/components/global/LoadingPage";
import { goNextStage } from "src/services/apiService/projects/goNextStage"; 
import { ProjectData, ProjectLaunchedSummary } from "src/interfaces/datas/project";

// Enum สำหรับ StageId
export enum StageId {
    CONCEPT = 0,
    PROTOTYPE = 1,
    PRODUCTION = 2,
    UNDEFINE = 3,
}

type Props = {
    projectId: string;
};

const StagePage = ({ projectId }: Props) => {
    const [project, setProject] = useState<ProjectData>({} as ProjectData); // เก็บข้อมูลโปรเจกต์
    const [projectSummary, setProjectSummary] = useState<ProjectLaunchedSummary>({} as ProjectLaunchedSummary); // เก็บข้อมูลโปรเจกต์
    const [loading, setLoading] = useState(true); // ใช้สำหรับ loading state
    const [error, setError] = useState<string | null>(null); // สำหรับจัดการ error
    const [activeStage, setActiveStage] = useState(0); // ควบคุมการเลื่อนของ stage
    const [isComplete, setIsComplete] = useState(false); // ควบคุมสถานะการ complete ของโปรเจกต์

    // เรียก API เมื่อคอมโพเนนต์เรนเดอร์
    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await getProjectById(projectId);
                if (response.data) {
                    const projectData = response.data;

                    // ตรวจสอบเงื่อนไข isFundingComplete และ isUpdateOnce
                    const isFundingComplete = (projectData.currentStage?.currentFunding || 0) >= (projectData.currentStage?.goalFunding || 0);
                    const isUpdateOnce = projectData.update?.length > 0;
                    
                    // อัปเดต project ด้วยเงื่อนไขที่คำนวณได้
                    setProject(projectData);
                    
                    if (projectData.currentStage) {
                        setProjectSummary({
                            ...projectSummary,
                            currentStage: projectData.currentStage,
                            projectStatus: projectData.status,
                            isFundingComplete: isFundingComplete,
                            isUpdateOnce: isUpdateOnce
                        });
                    }

                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                setError("Failed to load project");
                setLoading(false);
            }
        }
        fetchProject();
    }, [projectId]);

    // ฟังก์ชันสำหรับแสดงชื่อ Stage จาก stageId
    const getStageName = (stageId: StageId): string => {
        switch (stageId) {
            case StageId.CONCEPT:
                return "Concept";
            case StageId.PROTOTYPE:
                return "Prototype";
            case StageId.PRODUCTION:
                return "Production";
            default:
                return "Undefined Stage";
        }
    };

    // ฟังก์ชันสำหรับเปลี่ยน Stage ไปยังสเตจถัดไป และอัปเดต API
    const goToNextStage = async () => {
        if (!project) return;

        try {
            if (
                projectSummary?.currentStage?.stageId === StageId.PRODUCTION &&
                projectSummary?.isFundingComplete &&
                projectSummary?.isUpdateOnce
            ) {
                // เมื่ออยู่ใน Production stage และ funding, update ครบแล้ว ให้ถือว่าโปรเจกต์เสร็จสิ้น
                setIsComplete(true);
                return;
            }

            const response = await goNextStage(project.projectId);
            if (response.status === 200) {
                setActiveStage((prevActiveStage) => prevActiveStage + 1);
            }
        } catch (error) {
            console.error("Failed to go to next stage:", error);
        }
    };

    if (loading) {
        return <LoadingPage />;
    }
    if (error) return <p>{error}</p>;
    if (!project) return <p>No project available.</p>; // แสดงข้อความเมื่อไม่มีโปรเจกต์

    return (
        <div className="flex justify-center mt-10">
            <div className="overflow-hidden w-full max-w-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeStage * 100}%)` }}
                >
                    <div className="w-full flex-shrink-0 p-8 bg-orange-100 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">{project.name || "No Name"}</h2>
                        <p className="text-lg mb-6">
                            {getStageName(project.currentStage?.stageId ?? StageId.UNDEFINE)}
                        </p>

                        <div className="flex items-center mb-4">
                            {/* เปลี่ยนสีของไอคอนตามสถานะของ isFundingComplete */}
                            {projectSummary?.isFundingComplete ? (
                                <AiOutlineCheckCircle className="text-green-600 h-8 w-8" />
                            ) : (
                                <AiOutlineCloseCircle className="text-gray-400 h-8 w-8" />
                            )}
                            <p className="text-lg ml-3">
                                {projectSummary?.isFundingComplete ? "Funding complete" : "Funding ongoing"}
                            </p>
                        </div>

                        <div className="flex items-center mb-4">
                            {/* เปลี่ยนสีของไอคอนตามสถานะของ isUpdateOnce */}
                            {projectSummary?.isUpdateOnce ? (
                                <AiOutlineCheckCircle className="text-green-600 h-8 w-8" />
                            ) : (
                                <AiOutlineCloseCircle className="text-gray-400 h-8 w-8" />
                            )}
                            <p className="text-lg ml-3">
                                {projectSummary?.isUpdateOnce ? "Project updated" : "No updates yet"}
                            </p>
                        </div>

                        {/* แสดงปุ่ม Go to Next Stage */}
                        {!isComplete ? (
                            <button
                                onClick={goToNextStage}
                                className="mt-6 bg-gray-200 text-black font-semibold py-3 px-6 rounded-full text-lg"
                            >
                                {projectSummary?.currentStage?.stageId === StageId.PRODUCTION &&
                                projectSummary?.isFundingComplete &&
                                projectSummary?.isUpdateOnce
                                    ? "Mark as Complete"
                                    : "Go to next stage"}
                            </button>
                        ) : (
                            <p className="text-lg font-bold text-green-600">Project is complete!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StagePage;
