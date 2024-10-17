"use client";

import { Form, Input, Button, Select, message, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { changeStatus } from "src/services/apiService/projects/changeStatus";
import { editProjectById } from "src/services/apiService/projects/editProjectById";
import { getProjectById } from "src/services/apiService/projects/getProjectById";

type Props = {
    projectId: string;
};

export default function FormPayment({ projectId }: Props) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (projectId) {
                try {
                    const projectData = await getProjectById(projectId);
                    form.setFieldsValue({
                        bankName: projectData.data?.accountBank,
                        accountHolderName: projectData.data?.accountHolderName,
                        accountNumber: projectData.data?.accountNumber,
                    });
                } catch (error) {
                    message.error("Failed to load project data.");
                    console.error(error);
                }
            }
        };

        fetchProjectData();
    }, [projectId, form]);

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
            accountBank: values.bankName,
            accountHolderName: values.accountHolderName,
            accountNumber: values.accountNumber,
        };
        try {
            await editProjectById(projectId, projectPayload);
            await changeStatus(projectId);
            message.success("Launched project successfully!");
            router.push(`/explore/${projectId}`);
        } catch (error) {
            message.error("Go funding project failed!");
        } finally {
            setLoading(false);
        }
    };

    const onSave = async () => {
        try {
            const values = await form.validateFields();
            setSaveLoading(true);
            const projectPayload: Partial<EditProjectPayload> = {
                accountBank: values.bankName,
                accountHolderName: values.accountHolderName,
                accountNumber: values.accountNumber,
            };
            await editProjectById(projectId, projectPayload);
            message.success("Project saved successfully!");
        } catch (error) {
            message.error("Saving project failed!");
        } finally {
            setSaveLoading(false);
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
                <Select placeholder="Select your bank">
                    <Select.Option value="SCB">Siam Commercial Bank (SCB)</Select.Option>
                    <Select.Option value="KBANK">Kasikorn Bank (KBANK)</Select.Option>
                    <Select.Option value="BANGKOK">Bangkok Bank</Select.Option>
                    <Select.Option value="KTB">Krung Thai Bank (KTB)</Select.Option>
                    <Select.Option value="TMB">TMBThanachart Bank (TTB)</Select.Option>
                    <Select.Option value="CIMB">CIMB Thai Bank</Select.Option>
                    <Select.Option value="UOB">United Overseas Bank (UOB)</Select.Option>
                    <Select.Option value="BAAC">Bank for Agriculture and Agricultural Cooperatives (BAAC)</Select.Option>
                    <Select.Option value="GSB">Government Savings Bank (GSB)</Select.Option>
                    <Select.Option value="EXIM">Export-Import Bank of Thailand (EXIM)</Select.Option>
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
                    {
                        pattern: /^\d+$/,
                        message: "Account number must be numeric",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button
                    className="mr-2"
                    type="default"
                    loading={saveLoading}
                    disabled={saveLoading}
                    onClick={onSave}
                >
                    Save
                </Button>
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
