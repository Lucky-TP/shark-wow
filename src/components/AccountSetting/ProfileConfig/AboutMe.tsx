"use client";

import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
//import { editProjectById } from "src/services/apiService/projects/editProjectById";
import { editSelf } from "src/services/apiService/users/editSelf";
import { getSelf } from "src/services/apiService/users/getSelf";
//import { getUserById } from "src/services/apiService/users/getUserById";
//import QuillEditor from "src/components/AccountSetting/ProfileConfig/QuillEditorForAboutMe";
import QuillEditorForAboutMe from "src/components/AccountSetting/ProfileConfig/QuillEditorForAboutMe";

type Props = {
    
};

export default function AboutMe() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const handleEditorChange = (data: string) => {
        setContent(data);
    };

    useEffect(() => {
        const fetchUserData = async () => {
             try {
                 const userData = await getSelf();
                 setContent(userData.data?.aboutMe ?? "");
             } catch (error) {
                 message.error("Failed to load user data.");
             }
        };

        fetchUserData();
    }, []);

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
            <div className="h-full w-full pl-40 pr-40">
                <div className="pt-8">
                    <label className="block pb-2 text-xl font-bold text-black">About Me</label>
                    <QuillEditorForAboutMe value={content} onChange={handleEditorChange} />
                </div>
                <div className="mt-6 flex justify-end">
                <Button
                    type="primary"
                    loading={loading}
                    disabled={loading}
                    onClick={onFinish}
                >
                    Save 999
                    </Button>
                </div>
            </div>

            {/* how to render it */}
            {/*<div className="ql-editor !p-0 preview-content mt-20" dangerouslySetInnerHTML={{ __html: content }} /> */}
        </>
    );
}



