"use client";

import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { editSelf } from "src/services/apiService/users/editSelf";
import { useUserData } from "src/context/custom-hooks/useUserData";
import dynamic from "next/dynamic";

// Dynamically import QuillEditor
const QuillEditor = dynamic(() => import("src/components/global/QuillEditor"), { ssr: false });

type Props = {};

export default function AboutMe({}: Props) {
    const { user: initUser } = useUserData();

    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const handleEditorChange = (data: string) => {
        setContent(data);
    };

    useEffect(() => {
        if (initUser) {
            setContent(initUser?.aboutMe ?? "");
        }
    }, [initUser]);

    const onFinish = async () => {
        setLoading(true);
        const userPayload: Partial<EditUserPayload> = {
            aboutMe: content,
        };
        if (content) {
            try {
                await editSelf(userPayload);
                message.success("Project updated successfully!");
                //router.push(`/create-project/${projectId}/stages`);
            } catch (error) {
                message.error("Project update failed!");
            } finally {
                setLoading(false);
            }
        } else {
            message.error("Please input the story!");
        }
    };

    return (
        <>
            <QuillEditor value={content} onChange={handleEditorChange} projectId="1" />
            <div className="h-full w-full pl-40 pr-40">
                <div className="pt-8">
                    <label className="block pb-2 text-xl font-bold text-black">About Me</label>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button type="primary" loading={loading} disabled={loading} onClick={onFinish}>
                        Save 999
                    </Button>
                </div>
            </div>

            {/* how to render it */}
            {/*<div className="ql-editor !p-0 preview-content mt-20" dangerouslySetInnerHTML={{ __html: content }} /> */}
        </>
    );
}
