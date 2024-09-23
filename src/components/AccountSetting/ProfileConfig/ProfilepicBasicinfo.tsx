"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input, Upload, Button, Form, FormProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUserData } from "src/context/custom-hooks/useUserData";
import { editSelf } from "src/services/apiService/users/editSelf";
import { getBase64 } from "src/utils/getBase64";
import LoadingPage from "src/components/global/LoadingPage";
import { UserModel } from "src/interfaces/models/user";
import { Address } from "src/interfaces/models/common";
import { singleUpload } from "src/services/apiService/files/singleUpload";

type FieldType = {
    firstName?: string;
    lastName?: string;
    country?: string;
    city?: string;
    postalCode?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

export default function ProfilepictureBasicinformation() {
    const { user: initUser, refetchUserData } = useUserData();
    const [initUserLoading, setInitUserLoading] = useState<boolean>(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        if (uploading) return; // Prevent multiple uploads
        setUploading(true);
        try {
            const updatedAddress: Address[] = [];
            if (initUser) {
                updatedAddress.push(...initUser.address);
            } else {
                updatedAddress.push({
                    country: values.country ?? "",
                    city: values.city ?? "",
                    postalCode: values.postalCode ?? "",
                    province: "",
                });
            }

            const updatedFields: Partial<UserModel> = {
                firstName: values.firstName,
                lastName: values.lastName,
                address: updatedAddress,
            };
            await editSelf(updatedFields);
        } catch (error: unknown) {
            console.log("Update profile failed");
        } finally {
            setUploading(false);
        }

        message.success("Suay Pee Suay");

        console.log("Success:", values);
    };

    useEffect(() => {
        if (initUser) {
            setImageUrl(initUser?.profileImageUrl || null);
            setInitUserLoading(false);
        }
    }, [initUser]);

    const handlePreviewProfileImage = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file);
        }
        setImageUrl(file.url || file.preview);
    };

    const handleUploadProfileImage = async (info: any) => {
        if (uploading) return; // Prevent multiple uploads
        setUploading(true);

        try {
            const file: File = info.file.originFileObj;
            handlePreviewProfileImage(file);
            if (file && initUser) {
                const newImageUrl = await singleUpload({
                    file,
                    type: "profile",
                });
                setImageUrl(newImageUrl.url || initUser.profileImageUrl || null);
                await editSelf({ profileImageUrl: newImageUrl.url });
                refetchUserData();
            }
        } finally {
            setUploading(false);
        }
    };

    if (initUserLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex h-full w-full">
            <div className="flex w-full flex-col px-40">
                <div className="flex w-full flex-wrap justify-center">
                    {/* Profile Picture Section */}
                    <div className="flex flex-grow-0 flex-col items-center">
                        <h2 className="pb-4 text-xl font-bold text-black">Profile Picture</h2>

                        <div className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-full bg-white">
                            {imageUrl ? (
                                <Image src={imageUrl} alt="Profile" width={300} height={300} />
                            ) : (
                                <Upload
                                    name="profile"
                                    listType="picture"
                                    showUploadList={true}
                                    onChange={handleUploadProfileImage}
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
                                onChange={handleUploadProfileImage}
                            >
                                <Button icon={<UploadOutlined />} className="mt-4" type="default">
                                    Change Photo
                                </Button>
                            </Upload>
                        )}
                    </div>

                    {/* Basic Information Form Section */}
                    <div className="min-w-[300px] flex-grow flex-row flex-wrap px-32">
                        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <div className="pb-8"></div>

                            <Form.Item
                                name="firstName"
                                label={<label className="font-bold text-black">First name</label>}
                            >
                                <Input
                                    defaultValue={initUser?.firstName}
                                    placeholder="First name"
                                    className="w-4/6"
                                />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                label={<label className="font-bold text-black">Last name</label>}
                            >
                                <Input
                                    defaultValue={initUser?.lastName}
                                    placeholder="Last name"
                                    className="w-4/6"
                                />
                            </Form.Item>
                            <Form.Item
                                name="country"
                                label={<label className="font-bold text-black">Country</label>}
                            >
                                <Input
                                    defaultValue={
                                        initUser?.address[0] ? initUser?.address[0].country : ""
                                    }
                                    placeholder="Country"
                                    className="w-4/6"
                                />
                            </Form.Item>

                            <div className="flex flex-wrap gap-4">
                                <Form.Item
                                    name="city"
                                    label={<label className="font-bold text-black">City</label>}
                                    className="w-full md:w-0 md:flex-grow-[3]"
                                >
                                    <Input
                                        defaultValue={
                                            initUser?.address[0] ? initUser?.address[0].city : ""
                                        }
                                        placeholder="City"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="postalCode"
                                    label={
                                        <label className="font-bold text-black">Postal Code</label>
                                    }
                                    className="flex-grow-0 md:w-0 md:flex-grow-[2]"
                                >
                                    <Input
                                        defaultValue={
                                            initUser?.address[0]
                                                ? initUser?.address[0].postalCode
                                                : ""
                                        }
                                        placeholder="Postal Code"
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
