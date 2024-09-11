"use client";
import React, { useState } from "react";
import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProfilePicture_BasicInformation: React.FC = () => (
    <div className="flex h-full w-full bg-gray-100">
        <div className="bg-[#E5D8CA] p-8 w-full flex flex-col">
            <div className="flex">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center w-1/2">
                    <h2 className="text-black text-xl font-bold pb-4">Profile Photo</h2>
                    <div className="bg-white rounded-full h-[320px] w-[320px] flex items-center justify-center">
                        <Upload
                            name="profile"
                            listType="picture"
                            className="avatar-uploader"
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />} className="text-2xl">
                                Upload Photo
                            </Button>
                        </Upload>
                    </div>
                </div>

                {/* Basic Information Form Section */}
                <div className="w-2/3">
                    <Form layout="vertical">
                        <div className="pb-8"></div>
                        {[
                            { name: "firstname", label: "First Name", placeholder: "First Name" },
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
                                label={<label className="text-black font-bold">Postal Code</label>}
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

export default ProfilePicture_BasicInformation;
