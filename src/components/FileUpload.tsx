import { useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Button, Form, Upload, message as antdMessage } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiPath } from "src/constants/routePath";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (info: any) => {
        const selectedFile = info.file;
        if (selectedFile.status === "removed") {
            setFile(null);
        } else {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            antdMessage.error("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const response: AxiosResponse<FileUploadResponse> =
                await axios.post(apiPath.FILES.UPLOAD, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            setMessage(response.data.message);
            setImageUrl(response.data.url || null);
            setFile(null);
            antdMessage.success(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Upload failed");
            antdMessage.error(error.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4 flex items-center justify-center">
            <Form
                onFinish={handleSubmit}
                className="bg-white p-6 rounded shadow-md"
            >
                <h1 className="text-2xl mb-4">Upload File</h1>
                <Form.Item>
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Upload
                    </Button>
                </Form.Item>
                {message && <p className="mt-4">{message}</p>}
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt="Uploaded file"
                        width={300}
                        height={300}
                        className="mt-4"
                    />
                )}
            </Form>
        </div>
    );
}
