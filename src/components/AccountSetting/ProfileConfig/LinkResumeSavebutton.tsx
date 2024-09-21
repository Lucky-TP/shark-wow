"use client";

import React, { useState } from "react";
import { Form, Input, Upload, Button, Typography } from "antd";

const { Title } = Typography;

export default function LinkResumeSavebutton() {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (info: any) => {
        const file = info.fileList[0]?.originFileObj;
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <div className="w-full p-8 pl-40 pr-40 pt-6">
            <Form layout="vertical">
                <div className="pb-4">
                    <Title level={4} className="border-b border-gray-400 pb-2">
                        Outside Links
                    </Title>
                    {/* Website Link */}
                    <Form.Item label="Website Link" name="websiteLink">
                        <Input placeholder="Website Link" />
                    </Form.Item>

                    {/* Facebook Link */}
                    <Form.Item label="Facebook Link" name="facebookLink">
                        <Input placeholder="Facebook Link" />
                    </Form.Item>

                    {/* Twitter Link */}
                    <Form.Item label="Twitter Link" name="twitterLink">
                        <Input placeholder="Twitter Link" />
                    </Form.Item>

                    {/* YouTube Link */}
                    <Form.Item label="YouTube Link" name="youtubeLink">
                        <Input placeholder="YouTube Link" />
                    </Form.Item>
                </div>

                <div>
                    <Title level={4} className="border-b border-gray-400 pb-2">
                        Resume / CV
                    </Title>
                    <div className="mt-4 flex items-center">
                        <div className="mr-4 rounded-md bg-white px-4 py-2 shadow-inner">
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
            </Form>
            <div className="mt-6 flex justify-end">
                <Button
                    className="mt-20 w-fit"
                    type="primary"
                    //loading={loading}
                    //disabled={loading}
                    //onClick={onFinish}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
