"use client";
import React, { useState } from "react";
import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProfilePicture_BasicInformation: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // Convert file to Base64 format for image preview
    const getBase64 = (file: File, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Handle image upload and preview
    const handleUpload = (info: any) => {
        const file = info.file.originFileObj; // Access the uploaded file
        if (file) {
            getBase64(file, (url) => {
                setImageUrl(url); // Set the base64 URL to imageUrl state
            });
        }
    };

    return (
        <div className="flex h-full w-full">
            <div className="p-8 w-full flex flex-col">
                <div className="flex">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center w-1/2 pl-10">
                        <h2 className="text-black text-xl font-bold pb-4">Profile Photo</h2>
                        <div className="relative bg-white rounded-full h-[325px] w-[325px] flex items-center justify-center overflow-hidden">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Profile"
                                    className="object-cover h-full w-full"
                                />
                            ) : (
                                <Upload
                                    name="profile"
                                    listType="picture"
                                    showUploadList={false}
                                    onChange={handleUpload}
                                >
                                    <Button icon={<UploadOutlined />} className="text-2xl">
                                        Upload Photo
                                    </Button>
                                </Upload>
                            )}
                        </div>
                        {/* Move the Change Photo button outside the image container */}
                        {imageUrl && (
                            <Upload
                                name="profile"
                                listType="picture"
                                showUploadList={false}
                                onChange={handleUpload}
                            >
                                <Button icon={<UploadOutlined />} className="mt-4" type="default">
                                    Change Photo
                                </Button>
                            </Upload>
                        )}
                    </div>

                    {/* Basic Information Form Section */}
                    <div className="w-2/3 pl-8">
                        <Form layout="vertical">
                            <div className="pb-8"></div>
                            {[
                                {
                                    name: "firstname",
                                    label: "First Name",
                                    placeholder: "First Name",
                                },
                                { name: "lastname", label: "Last Name", placeholder: "Last Name" },
                                { name: "country", label: "Country", placeholder: "Country" },
                            ].map(({ name, label, placeholder }) => (
                                <Form.Item
                                    key={name}
                                    name={name}
                                    label={<label className="text-black font-bold">{label}</label>}
                                >
                                    <Input placeholder={placeholder} className="w-3/5" />
                                </Form.Item>
                            ))}
                            <div className="flex space-x-4">
                                <Form.Item
                                    name="city"
                                    label={<label className="text-black font-bold">City</label>}
                                    className="w-1/2"
                                >
                                    <Input placeholder="City" />
                                </Form.Item>
                                <Form.Item
                                    name="postalCode"
                                    label={
                                        <label className="text-black font-bold">Postal Code</label>
                                    }
                                    className="w-1/5"
                                >
                                    <Input placeholder="Postal Code" />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicture_BasicInformation;
