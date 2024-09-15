"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import QuillEditor from "src/components/global/QuillEditor"; // Adjust the path to your QuillEditor component

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
                <QuillEditor
                    value={aboutMeContent}
                    onChange={handleAboutMeChange}
                    projectId="about-me-section" // Optional, if needed for identification
                />
                <div className="text-right text-gray-500 mt-2">{aboutMeContent.length}/50000</div>
            </div>
        </div>
    );
};

export default AboutMe;
