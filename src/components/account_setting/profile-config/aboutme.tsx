"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";

const AboutMe: React.FC = () => {
    const [aboutMeContent, setAboutMeContent] = useState<string>("");

    const handleAboutMeChange = (content: string) => {
        setAboutMeContent(content);
        console.log("Content: ", content); // For testing purposes
    };

    return (
        <div className="h-full w-full bg-[#E5D8CA] pl-48 pr-48 w-full">
            <div className="pt-8">
                <label className="text-black text-xl font-bold pb-2 block">About me</label>
                <ReactQuill
                    value={aboutMeContent}
                    onChange={handleAboutMeChange}
                    modules={{
                        toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            [{ align: [] }],
                            ["image", "link"],
                        ],
                    }}
                    formats={[
                        "header",
                        "font",
                        "list",
                        "bullet",
                        "bold",
                        "italic",
                        "underline",
                        "align",
                        "link",
                        "image",
                    ]}
                    placeholder="Write about yourself..."
                    className="bg-white p-4 shadow border rounded w-full"
                />
                <div className="text-right text-gray-500 mt-2">{aboutMeContent.length}/500</div>
            </div>
        </div>
    );
};

export default AboutMe;
