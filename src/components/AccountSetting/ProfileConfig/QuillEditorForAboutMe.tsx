"use client";

import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import { singleUpload, UserSingleUploadDetail } from "src/services/apiService/files/singleUpload";

type QuillEditorProps = {
    value: string;
    onChange: (data: string) => void;
};

export default function QuillEditorForAboutMe({ value, onChange }: QuillEditorProps) {
    const quillRef = useRef<any>(null);

    const imageHandler = async () => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file && /^image\//.test(file.type)) {
                try {
                    const payload: UserSingleUploadDetail = {
                        file: file,
                        type: "userGeneral",
                    };
                    const response = await singleUpload(payload);
                    const url = response.url;
                    if (url) {
                        editor.insertEmbed(editor.getSelection()?.index || 0, "image", url);
                    } else {
                        message.error("Failed to upload image.");
                    }
                } catch (error) {
                    console.log(error);
                    message.error("Isas Image upload failed.");
                }
            } else {
                message.error("You can only upload images.");
            }
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                    ["image", "link"],
                    [
                        {
                            color: [
                                "#000000",
                                "#e60000",
                                "#ff9900",
                                "#ffff00",
                                "#008a00",
                                "#0066cc",
                                "#9933ff",
                                "#ffffff",
                                "#facccc",
                                "#ffebcc",
                                "#ffffcc",
                                "#cce8cc",
                                "#cce0f5",
                                "#ebd6ff",
                                "#bbbbbb",
                                "#f06666",
                                "#ffc266",
                                "#ffff66",
                                "#66b966",
                                "#66a3e0",
                                "#c285ff",
                                "#888888",
                                "#a10000",
                                "#b26b00",
                                "#b2b200",
                                "#006100",
                                "#0047b2",
                                "#6b24b2",
                                "#444444",
                                "#5c0000",
                                "#663d00",
                                "#666600",
                                "#003700",
                                "#002966",
                                "#3d1466",
                            ],
                        },
                    ],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        []
    );

    return (
        <ReactQuill
            theme="snow"
            className="min-w-[90dvw] pr-40"
            ref={quillRef}
            value={value}
            modules={modules}
            onChange={onChange}
        />
    );
}
