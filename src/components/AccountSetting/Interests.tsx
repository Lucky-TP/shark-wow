"use client";

import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { editSelf } from "src/services/apiService/users/editSelf";
import { useUserData } from "src/context/useUserData";
import { useRouter } from "next/navigation";

export default function Interests() {
    const [loading, setLoading] = useState<boolean>(false);
    const { user: initUser, refetchUserData } = useUserData();
    const [form] = Form.useForm();
    const router = useRouter();

    // State to track selected categories
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        if (!initUser) {
            return;
        }

        form.setFieldsValue({
            interestCategories: initUser.interestCategories || [],
        });
        setSelectedCategories(initUser.interestCategories || []);
    }, [initUser]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategories(
            (prevSelected) =>
                prevSelected.includes(category)
                    ? prevSelected.filter((item) => item !== category) // Remove if already selected
                    : [...prevSelected, category] // Add if not selected
        );
    };

    const onFinish = async () => {
        setLoading(true);
        const userPayload: Partial<EditUserPayload> = {
            interestCategories: selectedCategories,
        };
        try {
            await editSelf(userPayload);
            message.success("User's interest updated successfully!");
            refetchUserData();
            router.push(`/profile`);
        } catch (error) {
            message.error("User's interest update failed!");
        } finally {
            setLoading(false);
        }
    };

    // Image mapping for categories
    const categoryImages: { [key: string]: string } = {
        Technology: "/categoryBackground/technology.jpg",
        Education: "/categoryBackground/education.jpg",
        Art: "/categoryBackground/art.jpg",
        Film: "/categoryBackground/film.jpg",
        Music: "/categoryBackground/music.jpg",
        Food: "/categoryBackground/food.jpg",
        Transportation: "/categoryBackground/transportation.jpg",
        Health: "/categoryBackground/health.jpg",
        Game: "/categoryBackground/game.jpg",
    };

    // Function to determine box styling based on selection and background image
    const getBoxStyle = (category: string): React.CSSProperties => ({
        backgroundImage: `url(${categoryImages[category]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: selectedCategories.includes(category)
            ? "4px solid #00FF00" // Green border for selected boxes
            : "none",
        position: "relative", // TypeScript requires this to match CSS property values
        opacity: selectedCategories.includes(category) ? 0.7 : 1,
        boxShadow: selectedCategories.includes(category)
            ? "0px 0px 10px 5px rgba(0, 255, 0, 0.5)" // Green glow for selected boxes
            : "none",
        transition: "all 0.3s ease-in-out", // Smooth transitions for selection
    });

    return (
        <div className="w-full p-8 pl-40 pr-40 pt-6">
            <div className="pb-8">
                <h2 className="border-b border-gray-400 pb-2 text-2xl font-bold text-black">
                    Category Interests
                </h2>
            </div>
            <div className="relative grid grid-cols-3 gap-6">
                {[
                    "Technology",
                    "Education",
                    "Art",
                    "Film",
                    "Music",
                    "Food",
                    "Transportation",
                    "Health",
                    "Game",
                ].map((category) => (
                    <div
                        key={category}
                        className="relative z-10 cursor-pointer px-4 py-20 text-center shadow-md transition duration-200 hover:bg-gray-100"
                        style={getBoxStyle(category)}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {/* Background overlay for better text visibility */}
                        <div
                            className="absolute inset-0 z-10 bg-black"
                            style={{
                                opacity: selectedCategories.includes(category) ? 0.7 : 0.3, // Adjust these values to control the fade effect
                                transition: "opacity 0.3s ease", // Smooth fade transition
                            }}
                        ></div>
                        {/* Category name styling */}
                        <div className="relative z-20 text-2xl font-extrabold text-white">
                            <span
                                className="px-2"
                                style={{
                                    textShadow: "4px 4px 6px rgba(0, 0, 0, 0.9)", // Increased shadow size and opacity, // Text shadow for better readability
                                }}
                            >
                                {category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-14">
                <Button
                    type="primary"
                    loading={loading}
                    onClick={onFinish}
                    disabled={loading}
                    className="w-full bg-orange-600"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
