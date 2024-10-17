"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { AddNewUpdateToProjectPayload, EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import QuillEditor from "src/components/global/QuillEditor";
import { addNewUpdateToProject } from "src/services/apiService/projects/addNewUpdateToProject";

type UpdateEditorProps = {
    projectId: string;
};

export default function UpdateEditor({ projectId }: UpdateEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [form] = Form.useForm();

    const handleEditorChange = (data: string) => {
        setContent(data);
    };

    const onFinish = async (values: { title: string }) => {
        setLoading(true);
        const projectPayload: AddNewUpdateToProjectPayload = {
            title: values.title,
            detail: content,
        };
    
        if (content) {
            try {
                if (projectPayload) {
                    console.log("Payload", projectPayload);
                    await addNewUpdateToProject(projectId, projectPayload);
                    message.success("Project updated successfully!");
                    router.push(`/explore/${projectId}`);
                }
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
        <div className="px-24 pt-8">
            <h1 className="text-3xl font-bold">Update your project</h1>
            <p className="text-lg mb-4">
                Tell about your updates to your supporters
            </p>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: "Please input the title" }]}
                >
                    <Input placeholder="Enter the title" />
                </Form.Item>

                <Form.Item>
                    <QuillEditor value={content} onChange={handleEditorChange} projectId={projectId} />
                </Form.Item>

                <Form.Item>
                    <Button
                        className="w-fit mt-20"
                        type="primary"
                        loading={loading}
                        disabled={loading}
                        htmlType="submit"
                    >
                        Save & Update
                    </Button>
                </Form.Item>
            </Form>

            
        </div>
    );
}
