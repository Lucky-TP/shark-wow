"use client";

import React, { useState } from "react";
import { Form, Input, Upload, Button, Typography } from "antd";

const { Title } = Typography;

export function OutsideLink() {
    return (
        <div className="pb-4">
            <Title level={4} className="pb-2 border-b border-gray-400">
                Outside Links
            </Title>
            {["Facebook", "Twitter", "YouTube"].map((platform) => (
                <Form.Item
                    label={`${platform} Link`}
                    name={`${platform.toLowerCase()}Link`}
                    key={platform}
                >
                    <Input placeholder={`${platform} Link`} />
                </Form.Item>
            ))}
        </div>
    );
}

export function Resume_CV() {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (info: any) => {
        const file = info.fileList[0]?.originFileObj;
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <div>
            <Title level={4} className="pb-2 border-b border-gray-400">
                Resume / CV
            </Title>
            <div className="flex items-center mt-4">
                <div className="bg-white rounded-md shadow-inner px-4 py-2 mr-4">
                    {fileName ? fileName : "No file selected"}
                </div>
                <Upload
                    accept=".pdf"
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => {
                        setTimeout(() => onSuccess && onSuccess("ok"), 0);
                        setFileName((file as File).name);
                    }}
                >
                    <Button>Upload your pdf</Button>
                </Upload>
            </div>
        </div>
    );
}

export default function OutsideLink_ResumeCV() {
    return (
        <div className="p-8 w-full pt-6 pl-40 pr-40">
            <Form layout="vertical">
                <OutsideLink />
                <Resume_CV />
            </Form>
            <div className="flex justify-end mt-6">
                <Button type="primary">Save</Button>
            </div>
        </div>
    );
}
