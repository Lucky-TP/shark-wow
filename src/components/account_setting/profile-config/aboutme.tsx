"use client";
import React, { useEffect, useState } from "react";
//import "react-quill/dist/quill.snow.css"; // Import Quill styles
import QuillEditor from "src/components/global/QuillEditor"; // Adjust the path to your QuillEditor component
import { Button, message } from "antd";
//import { updateAboutMeContent } from "src/services/apiService/user/updateAboutMeContent"; // Adjust the path and service function

const AboutMe: React.FC = () => {
    const [aboutMeContent, setAboutMeContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch existing content (if any) when component mounts
    useEffect(() => {
        const fetchAboutMeContent = async () => {
            try {
                // Replace with your API call to get the initial content
                const response = await fetch("/api/about-me"); // Adjust endpoint as needed
                const data = await response.json();
                setAboutMeContent(data?.content ?? "");
            } catch (error) {
                message.error("Failed to load content.");
            }
        };

        fetchAboutMeContent();
    }, []);

    // Handle editor changes
    const handleAboutMeChange = (content: string) => {
        setAboutMeContent(content);
    };

    

    // Handle form submission
    

    return (
        <div className="h-full w-full pl-40 pr-40">
            <div className="pt-8">
                <label className="text-black text-xl font-bold pb-2 block">About Me</label>
                
                <QuillEditor
                    value={aboutMeContent}
                    onChange={handleAboutMeChange}
                    projectId="about-me-section" // Optional, if needed for identification
                />
            </div>
        </div>
    );
};

export default AboutMe;
