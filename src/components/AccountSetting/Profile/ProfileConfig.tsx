"use client";

import { useState, useEffect } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Upload,
    message,
    Image,
    DatePickerProps,
} from "antd";
import { Typography } from "antd";
const { Title } = Typography;
import { stringToDayjs, dayjsToString } from "src/utils/date/dateConversion"; // Import your utilities
import { Dayjs } from "dayjs";

import QuillEditorForAboutMe from "./QuillEditorForAboutMe";

import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { upload } from "src/services/apiService/files/upload";

import { editSelf } from "src/services/apiService/users/editSelf";

import { getSelf } from "src/services/apiService/users/getSelf";
//import { getUserById } from "src/services/apiService/users/getUserById";

import { FileTypeKeys } from "src/constants/payloadKeys/file";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { getBase64 } from "src/utils/getBase64";

type Props = {};

export default function ProfileConfig() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    // ProfilePicture
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadingProfilePicture, setUploading] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const defaultPlaceholder = "/defaultProfilePic.png"; // Default placeholder image URL

    // About Me
    const [content, setContent] = useState<string>("");
    const handleEditorChange = (data: string) => {
        setContent(data);
    };

    // Fetch project data and set initial form values
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getSelf();

                // Profile Picture
                setImageUrl(userData?.data?.profileImageUrl || defaultPlaceholder);
                setPreviewImage(userData?.data?.profileImageUrl || defaultPlaceholder);

                // Convert birthDate to Dayjs object
                const birthDate = userData.data?.birthDate
                    ? stringToDayjs(userData.data?.birthDate)
                    : null;

                // About Me
                setContent(userData.data?.aboutMe ?? "");

                form.setFieldsValue({
                    username: userData.data?.username,
                    firstName: userData.data?.firstName,
                    lastName: userData.data?.lastName,
                    birthDate, // Pass the Dayjs object here
                    country: userData.data?.address[0].country,
                    city: userData.data?.address[0].city,
                    province: userData.data?.address[0].province,
                    postalCode: userData.data?.address[0].postalCode,
                    //websiteLink: userData.data?.contact.
                    xLink: userData.data?.contact.X,
                    facebookLink: userData.data?.contact.facebook,
                    phoneNumber: userData.data?.contact.phone,
                    youtubeLink: userData.data?.contact.youtube,
                    cvUrl: userData.data?.cvUrl,
                });
            } catch (error) {
                message.error("Failed to load user data.");
                console.error(error);
            }
        };

        fetchUserData();
    }, [form]);

    // Profile Picture
    const handlePreviewProfileImage = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file);
        }
        setPreviewImage(file.url || file.preview);
    };

    const handleUploadProfileImage = async (info: any) => {
        if (uploadingProfilePicture) return; // Prevent multiple uploads
        setUploading(true);

        try {
            const file: Blob = info.file.originFileObj;
            handlePreviewProfileImage(file); // Show preview before saving
            if (file) {
                const newImageUrl = await upload({
                    file,
                    fileType: FileTypeKeys.PROFILE_IMAGE_FILE,
                });
                setPreviewImage(newImageUrl[0].url || defaultPlaceholder);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = () => {
        setPreviewImage(defaultPlaceholder); // Replace with default placeholder image
    };

    const handleSaveProfilePicture = async () => {
        if (uploadingProfilePicture) return;

        setUploading(true);
        try {
            // Always save the previewImage, whether it's a new image or the placeholder
            const imageToSave =
                previewImage === defaultPlaceholder
                    ? defaultPlaceholder
                    : previewImage || undefined;

            await editSelf({
                profileImageUrl: imageToSave, // Save either the default placeholder or the uploaded image URL
            });

            setImageUrl(previewImage);
            //fetchUserData(); //refetchUserData();
            console.log("Profile picture updated successfully!");
        } finally {
            setUploading(false);
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);

        const userPayload: Partial<EditUserPayload> = {
            aboutMe: content,
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            birthDate: values.birthDate ? dayjsToString(values.birthDate) : undefined,
            cvUrl: values.cvUrl,

            contact: {
                facebook: values.facebookLink,
                X: values.xLink,
                youtube: values.youtubeLink,
                phone: values.phoneNumber,
            },

            address: [
                {
                    country: values.country,
                    city: values.city,
                    province: values.province,
                    postalCode: values.postalCode,
                },
            ],
        };

        try {
            await editSelf(userPayload);
            message.success("User Profile updated successfully!");
            router.push(`/profile`);
        } catch (error) {
            message.error("User Profile update failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pl-40 pr-40">
            <Form form={form} layout="vertical" onFinish={onFinish} className="w-full">

                {/* Profile Picture */}
                <div className="relative flex flex-col items-center mb-7 ">
                    <p className="font-serif text-xl mb-3">
                        Profile Picture
                    </p>
                    <div
                        className="relative"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        style={{ width: "256px", height: "256px" }} // Keep the hover area consistent with the image size
                    >
                        {/* Profile Image or Placeholder */}
                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-200">
                            {previewImage ? (
                                <Image
                                    src={previewImage}
                                    alt="Profile"
                                    className="h-full w-full rounded-full object-cover"
                                    width={256}
                                    height={256}
                                />
                            ) : (
                                <span className="text-gray-500">No Image</span>
                            )}

                            {/* Hover Overlay for Image */}
                            {hover && previewImage !== defaultPlaceholder && (
                                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50">
                                    {/* Delete Icon */}
                                    <Button
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        onClick={handleDeleteImage}
                                        size="large"
                                    />
                                    {/* Change Icon */}
                                    <Upload
                                        name="profile"
                                        showUploadList={false}
                                        onChange={handleUploadProfileImage}
                                    >
                                        <Button
                                            shape="circle"
                                            icon={<UploadOutlined />}
                                            size="large"
                                        />
                                    </Upload>
                                </div>
                            )}

                            {/* Hover Overlay for Placeholder (Only Change Icon) */}
                            {hover && previewImage === defaultPlaceholder && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    {/* Only show Change Icon on placeholder */}
                                    <Upload
                                        name="profile"
                                        showUploadList={false}
                                        onChange={handleUploadProfileImage}
                                    >
                                        <Button
                                            shape="circle"
                                            icon={<UploadOutlined />}
                                            size="large"
                                        />
                                    </Upload>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your last name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="birthDate"
                    label="Birth Date"
                    rules={[
                        {
                            required: true,
                            message: "Please select your birth date!",
                        },
                    ]}
                >
                    <DatePicker
                        format="YYYY-MM-DD" // Use the format you expect
                    />
                </Form.Item>

                <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                        {
                            required: true,
                            message: "Please input the country!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: "Please input the city!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="province"
                    label="Province"
                    rules={[{ required: true, message: "Please input the city!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="postalCode"
                    label="Postal Code"
                    rules={[
                        {
                            required: true,
                            message: "Please input the postal code!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div className="pb-10 pt-10">
                    <Title level={4} className="border-b border-gray-400 pb-1">
                        About Me
                    </Title>
                    <QuillEditorForAboutMe value={content} onChange={handleEditorChange} />
                </div>
                <div className="pb-10 pt-10">
                    <Title level={4} className="border-b border-gray-400 pb-1">
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
                    <Form.Item label="X Link" name="xLink">
                        <Input placeholder="X Link" />
                    </Form.Item>
                    {/* YouTube Link */}
                    <Form.Item label="Youtube Link" name="youtubeLink">
                        <Input placeholder="YouTube Link" />
                    </Form.Item>
                    {/* YouTube Link */}
                    <Form.Item label="Phone Number" name="phoneNumber">
                        <Input placeholder="Phone number" />
                    </Form.Item>
                </div>

                {/* Resume / CV */}
                <div>
                    <Title level={4} className="border-b border-gray-400 pb-2">
                        Resume / CV
                    </Title>

                    <Form.Item
                        label="Upload Your Resume or Update Your Current Resume"
                        name="cvUrl"
                    >
                        <Upload
                            accept=".pdf"
                            maxCount={1}
                            beforeUpload={() => false} // Prevent automatic upload, handle it manually
                            onChange={async (info) => {
                                const file = info.fileList[0]?.originFileObj;

                                if (file) {
                                    const uploadedFile = await upload({
                                        file,
                                        fileType: FileTypeKeys.CV_FILE, // Assuming you have a key for this file type
                                    });

                                    if (uploadedFile?.[0]?.url) {
                                        form.setFieldsValue({ cvUrl: uploadedFile[0].url }); // Set cvUrl in form
                                        //message.success("Resume uploaded successfully!");
                                    } else {
                                        message.error("Failed to upload resume.");
                                    }
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload PDF</Button>
                        </Upload>
                    </Form.Item>
                </div>
                {/*
                <div className="pb-14">
                    <Title level={4} className="border-b border-gray-400 pb-2">
                        Resume / CV
                    </Title>
                    <div className="mt-4 flex items-center">
                        <div className="mr-4 rounded-md bg-white px-4 py-2 shadow-inner">
                        </div>
                        
                            
                    </div>
                </div>
                */}
                <Form.Item className="flex justify-end pt-6">
                    <Button
                        type="primary"
                        loading={loading}
                        disabled={loading && uploadingProfilePicture}
                        onClick={handleSaveProfilePicture}
                        htmlType="submit"
                    >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
