"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import LoadingPage from "src/components/global/LoadingPage";
import { goNextStage } from "src/services/apiService/projects/goNextStage"; // นำเข้าฟังก์ชัน API
import { ProjectData } from "src/interfaces/datas/project";

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
    const [project, setProject] = useState<ProjectData | null>(null); // เก็บข้อมูลโปรเจกต์
    const [loading, setLoading] = useState(true); // ใช้สำหรับ loading state
    const [error, setError] = useState<string | null>(null); // สำหรับจัดการ error
    const [activeStage, setActiveStage] = useState(0); // ควบคุมการเลื่อนของ stage

    // เรียก API เมื่อคอมโพเนนต์เรนเดอร์
    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await getProjectById(projectId);
                if (response.data ){
                setProject(response.data); // ตั้งค่าข้อมูลที่ได้จาก API ไปยัง state
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
            const response = await goNextStage(project.projectId);
            if (response.status === 200) {
                setProject((prevProject) => {
                    if (!prevProject) return null;
                    
                    // ตรวจสอบค่าของ currentStage
                    const currentStageId = prevProject.currentStage?.stageId ?? StageId.CONCEPT;

                    // สร้าง stage ใหม่ตามลำดับ
                    let newStageId = currentStageId;
                    if (currentStageId === StageId.CONCEPT) {
                        newStageId = StageId.PROTOTYPE;
                    } else if (currentStageId === StageId.PROTOTYPE) {
                        newStageId = StageId.PRODUCTION;
                    }

                    // คืนค่า ProjectData ที่ปรับปรุงแล้ว
                    return {
                        ...prevProject,
                        currentStage: {
                            ...prevProject.currentStage,
                            stageId: newStageId,
                            name: prevProject.currentStage?.name ?? "Unnamed Stage",
                        },
                    };
                });

                // อัปเดต UI เพื่อเลื่อนไปยัง stage ถัดไป
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
                            <AiOutlineCheckCircle className="text-green-600 h-8 w-8" />
                            <p className="text-lg ml-3">Funding complete</p>
                        </div>

                        <div className="flex items-center mb-6">
                            <AiOutlineCheckCircle className="text-green-600 h-8 w-8" />
                            <p className="text-lg ml-3">Project progress has been updated by creator</p>
                        </div>

                        <button
                            onClick={goToNextStage}
                            className="mt-6 bg-gray-200 text-black font-semibold py-3 px-6 rounded-full text-lg"
                        >
                            Go to next stage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StagePage;
