"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Upload, message, Image } from "antd";
import { Typography } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { stringToDayjs, dayjsToString } from "src/utils/date/dateConversion"; // Import your utilities
import { editSelf } from "src/services/apiService/users/editSelf";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { getBase64 } from "src/utils/getBase64";
import { singleUpload, UserSingleUploadDetail } from "src/services/apiService/files/singleUpload";
import { useUserData } from "src/context/useUserData";
import Link from "next/link";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";

const QuillEditor = dynamic(() => import("src/components/global/QuillEditor"), { ssr: false });

type Props = {};

export default function ProfileConfig() {
    const { Title } = Typography;
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    // ProfilePicture
    // const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [cvUrl, setCvUrl] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isUpload, setIsUpload] = useState<boolean>(false);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);

    const [hover, setHover] = useState<boolean>(false);
    const defaultPlaceholder = "/defaultProfilePic.png"; // Default placeholder image URL

    // About Me
    const [content, setContent] = useState<string>("");
    const handleEditorChange = (data: string) => {
        setContent(data);
    };

    const { user: initUser, refetchUserData } = useUserData();
    useEffect(() => {
        if (!initUser) {
            return;
        }

        // Profile Picture
        // setImageUrl(initUser.profileImageUrl || defaultPlaceholder);
        setPreviewImage(initUser?.profileImageUrl || defaultPlaceholder);

        setCvUrl(initUser.cvUrl);

        // Convert birthDate to Dayjs object
        const birthDate = initUser.birthDate ? stringToDayjs(initUser.birthDate) : null;

        // About Me
        setContent(initUser.aboutMe ?? "");

        form.setFieldsValue({
            username: initUser.username,
            firstName: initUser.firstName,
            lastName: initUser.lastName,
            birthDate, // Pass the Dayjs object here
            country: initUser.address[0]?.country,
            city: initUser.address[0]?.city,
            province: initUser.address[0]?.province,
            postalCode: initUser.address[0]?.postalCode,
            //websiteLink: initUser.contact.
            xLink: initUser.contact.X,
            facebookLink: initUser.contact.facebook,
            phoneNumber: initUser.contact.phone,
            youtubeLink: initUser.contact.youtube,
            cvUrl: initUser.cvUrl,
        });
    }, [initUser]);

    // Profile Picture
    const handlePreviewProfileImage = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file);
        }
        setPreviewImage(file.url || file.preview);
    };

    // const handlePreviewCvUrl = async (file: any) => {
    //     setCvUrl(file.url || file.preview);
    // };

    const onProfileChange = async (info: any) => {
        if (isUpload) return; // Prevent multiple uploads
        setIsUpload(true);

        try {
            const file: File = info.file.originFileObj;
            handlePreviewProfileImage(file); // Show preview before saving
            if (file) {
                setProfileImageFile(file);
                // const result = await singleUpload({
                //     file,
                //     type: "profile",
                // } satisfies UserSingleUploadDetail);
                // setPreviewImage(result.url || defaultPlaceholder);
                // await editSelf({ profileImageUrl: result.url ?? initUser?.profileImageUrl });
                // message.success("Update profile image successfully!");
                // refetchUserData();
            }
            // } catch (error: unknown) {
            //     message.error("Update profile imagefailed!");
        } finally {
            setIsUpload(false);
        }
    };

    const onCvChange = async (info: any) => {
        if (isUpload) return; // Prevent multiple uploads
        setIsUpload(true);

        try {
            const file: File = info.file;
            if (file) {
                setCvFile(file);
            }
        } finally {
            setIsUpload(false);
        }
    };

    const handleUploadCv = async (info: any) => {
        if (isUpload) return; // Prevent multiple uploads
        setIsUpload(true);
        try {
            const file: File = info.file;
            if (file) {
                const result = await singleUpload({
                    file,
                    type: "cv",
                } satisfies UserSingleUploadDetail);
                setCvUrl(result.url ?? null);
                await editSelf({ cvUrl: result.url ?? initUser?.cvUrl });
                message.success("Update cv successfully!");
                refetchUserData();
            }
        } catch (error: unknown) {
            message.error("Update cv failed!");
        } finally {
            setIsUpload(false);
        }
    };

    const handleDeleteImage = () => {
        setPreviewImage(defaultPlaceholder); // Replace with default placeholder image
    };

    // const handleSaveProfilePicture = async () => {
    //     if (uploadingProfilePicture) return;

    //     setUploading(true);
    //     try {
    //         // Always save the previewImage, whether it's a new image or the placeholder
    //         const imageToSave =
    //             previewImage === defaultPlaceholder
    //                 ? defaultPlaceholder
    //                 : previewImage || undefined;

    //         await editSelf({
    //             profileImageUrl: imageToSave, // Save either the default placeholder or the uploaded image URL
    //         });
    //         setImageUrl(previewImage);
    //         refetchUserData();
    //         //fetchUserData(); //refetchUserData();
    //         console.log("Profile picture updated successfully!");
    //     } finally {
    //         setUploading(false);
    //     }
    // };

    const onFinish = async (values: any) => {
        setLoading(true);

        let uploadProfilePromise: Promise<FileUploadResponse> | null = null;
        let uploadCvPromise: Promise<FileUploadResponse> | null = null;

        if (profileImageFile) {
            uploadProfilePromise = singleUpload({ file: profileImageFile, type: "profile" });
        }

        if (cvFile) {
            uploadCvPromise = singleUpload({ file: cvFile, type: "cv" });
        }

        const [uploadProfileResult, uploadCvResult] = await Promise.all([
            uploadProfilePromise,
            uploadCvPromise,
        ]);

        if (uploadProfileResult) {
            message.success("Profile image uploaded successfully!");
        }

        if (uploadCvResult) {
            message.success("CV uploaded successfully!");
        }

        const userPayload: Partial<EditUserPayload> = {
            aboutMe: content,
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            birthDate: values.birthDate ? dayjsToString(values.birthDate) : undefined,
            profileImageUrl: uploadProfileResult
                ? uploadProfileResult.url
                : previewImage === defaultPlaceholder
                  ? defaultPlaceholder
                  : initUser?.profileImageUrl,
            cvUrl: uploadCvResult?.url || initUser?.cvUrl,
            contact: {
                facebook: values.facebookLink,
                X: values.xLink,
                youtube: values.youtubeLink,
                phone: values.phoneNumber,
            },
        };

        try {
            await editSelf(userPayload);
            message.success("User Profile updated successfully!");
            refetchUserData();
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
                <div className="relative mb-7 flex flex-col items-center">
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
                                        onChange={onProfileChange}
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
                                        onChange={onProfileChange}
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

                <div>
                    <Title level={4} className="border-b border-gray-400 pb-1">
                        About Me
                    </Title>
                    <QuillEditor value={content} onChange={handleEditorChange} />
                </div>
                <div className="pb-10 pt-10">
                    <Title level={4} className="border-b border-gray-400 pb-1">
                        Outside Links
                    </Title>
                    {/* Facebook Link */}
                    <Form.Item
                        label="Facebook Link"
                        name="facebookLink"
                        rules={[
                            {
                                type: "url",
                                message: "Please enter a valid URL!",
                            },
                            {
                                pattern: /^https:\/\/(www\.)?facebook\.com\/.+$/,
                                message:
                                    "Please enter a valid Facebook URL (e.g., https://www.facebook.com/username).",
                            },
                        ]}
                    >
                        <Input placeholder="Facebook Link" />
                    </Form.Item>

                    {/* X (formerly Twitter) Link */}
                    <Form.Item
                        label="X Link"
                        name="xLink"
                        rules={[
                            {
                                type: "url",
                                message: "Please enter a valid URL!",
                            },
                            {
                                pattern: /^https:\/\/(www\.)?(x|twitter)\.com\/.+$/,
                                message:
                                    "Please enter a valid X URL (e.g., https://www.x.com/username or https://www.twitter.com/username).",
                            },
                        ]}
                    >
                        <Input placeholder="X Link" />
                    </Form.Item>

                    {/* YouTube Link */}
                    <Form.Item
                        label="YouTube Link"
                        name="youtubeLink"
                        rules={[
                            {
                                type: "url",
                                message: "Please enter a valid URL!",
                            },
                            {
                                pattern: /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                                message:
                                    "Please enter a valid YouTube URL (e.g., https://www.youtube.com/channel/ID or https://youtu.be/videoID).",
                            },
                        ]}
                    >
                        <Input placeholder="YouTube Link" />
                    </Form.Item>
                </div>

                {/* Resume / CV */}
                <div>
                    <Title level={4} className="border-b border-gray-400 pb-2">
                        Resume / CV
                    </Title>

                    <Form.Item label="Upload Your Resume or Update Your Current Resume" name="cv">
                        {cvUrl && (
                            <Link className="mr-4 text-blue-600 underline" href={cvUrl}>
                                Your CV
                            </Link>
                        )}
                        <Upload
                            accept=".pdf"
                            maxCount={1}
                            beforeUpload={() => false} // Prevent automatic upload, handle it manually
                            onChange={onCvChange}
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
                <Form.Item>
                    <div className="flex justify-end pt-6">
                        <Button
                            type="primary"
                            loading={loading}
                            disabled={loading || isUpload}
                            htmlType="submit"
                            className="w-full bg-orange-600"
                        >
                            Save Changes
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
