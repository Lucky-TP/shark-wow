"use client";

import { Form, Input, Button, Select, message, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectStatus } from "src/interfaces/models/enums";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { editProjectById } from "src/services/apiService/projects/editProjectById";

type Props = {
    projectId: string;
};

export default function FormPayment({ projectId }: Props) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const showConfirmModal = () => {
        Modal.confirm({
            title: "Confirm to Launch Your Project's Funding Campaign.",
            content: "Are you sure you want to launch your project's funding campaign?",
            okText: "Yes",
            cancelText: "No",
            centered: true,
            onOk: () => {
                form.submit();
            },
        });
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        const projectPayload: Partial<EditProjectPayload> = {
            status: ProjectStatus.RUNNING,
        };
        console.log(projectPayload);
        try {
            await editProjectById(projectId, projectPayload);
            message.success("Project updated successfully!");
            router.push(`/explore/${projectId}`);
        } catch (error) {
            message.error("Go funding project failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} className="w-full">
            <h1>Bank account location</h1>
            <Form.Item name="bankAccountLocation">
                <Select defaultValue="Thailand" disabled />
            </Form.Item>
            <Title level={3}>Bank information</Title>
            <Form.Item
                name="bankName"
                label="Select bank name"
                rules={[{ required: true, message: "Please input your bank name" }]}
            >
                <Select>
                    <Select.Option value="SCB">SCB</Select.Option>
                    <Select.Option value="KBANK">KBANK</Select.Option>
                    <Select.Option value="BANGKOK">Bangkok</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="accountHolderName"
                label="Account holder name"
                rules={[
                    {
                        required: true,
                        message: "Please input your Account holder name",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[
                    {
                        required: true,
                        message: "Please input your Account number",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    loading={loading}
                    disabled={loading}
                    onClick={showConfirmModal}
                >
                    Launch Your Project
                </Button>
            </Form.Item>
        </Form>
    );
}
