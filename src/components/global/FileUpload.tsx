import { useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Button, Form, Upload, message as antdMessage } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiPath } from "src/constants/routePath";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";
import {
    multipleUpload,
    ProjectMultipleUploadsDetail,
} from "src/services/apiService/files/multipleUpload";

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
        // if (!file) {
        //     antdMessage.error("Please select a file to upload.");
        //     return;
        // }

        try {
            // Single mock file
            const mockFile: File = new File(["file content 1"], "mockFile.png", {
                type: "image/png",
            });

            // Array of mock files
            const mockFiles: File[] = [
                new File(["file content 1"], "file1.png", { type: "image/png" }),
                new File(["file content 2"], "file2.png", { type: "image/png" }),
                new File(["file content 3"], "file3.png", { type: "image/png" }),
                new File(["file content 4"], "file4.png", { type: "image/png" }),
            ];

            setLoading(true);
            const response: FileUploadResponse[] = await multipleUpload({
                files: mockFiles,
                type: "general",
                projectId: "QM2gmeMoyqJb35GAbDQe",
            });
            setMessage(response[0].message);
            setImageUrl(response[0].url || null);
            setFile(null);
            antdMessage.success(response[0].message);
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Upload failed");
            antdMessage.error(error.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4 flex items-center justify-center">
            <Form onFinish={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Upload File</h1>
                <Form.Item>
                    <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
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
