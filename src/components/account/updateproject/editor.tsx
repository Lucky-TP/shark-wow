"use client";

import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { AddNewUpdateToProjectPayload, EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import QuillEditor from "src/components/global/QuillEditor";
import { addNewUpdateToProject } from "src/services/apiService/projects/addNewUpdateToProject";

type FormStoryProps = {
    projectId: string;
};

export default function UpdateEditor({ projectId }: FormStoryProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const handleEditorChange = (data: string) => {
        setContent(data);
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            if (projectId) {
                try {
                    const projectData = await getProjectById(projectId);
                    setContent(projectData.data?.story ?? "");
                } catch (error) {
                    message.error("Failed to load project data.");
                }
            }
        };

        fetchProjectData();
    }, [projectId]);

    const onFinish = async () => {
        setLoading(true);
        const projectPayload: Partial<AddNewUpdateToProjectPayload> = {
            detail: content,
        };

        if (content) {
            try {
                await addNewUpdateToProject(projectId, projectPayload);
                message.success("Project updated successfully!");
                router.push(`/create-project/${projectId}/stages`);
            } catch (error) {
                message.error("Project update failed!");
            } finally {
                setLoading(false);
            }
        } else {
            message.error("Please input the story!");
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold">Story</h1>
            <p className="text-lg mb-4">
                Tell potential contributors more about your campaign. Provide details that will
                motivate people to contribute. A good pitch is compelling, informative, and easy to
                digest.
            </p>
            <QuillEditor value={content} onChange={handleEditorChange} projectId={projectId} />
            <Button
                className="w-fit mt-20 "
                type="primary"
                loading={loading}
                disabled={loading}
                onClick={onFinish}
            >
                Save & Continue
            </Button>

            
        </>
    );
}
