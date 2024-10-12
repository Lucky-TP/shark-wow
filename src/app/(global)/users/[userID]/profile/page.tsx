"use client";
import React from "react";
import { useParams } from "next/navigation"; // Import useParams
import GenericUserProfile from "src/components/GenericUserAccount/GenericUserProfile";
import TopBar from "src/components/GenericUserAccount/TopBar";

type Props = {};

export default function UserProfile({}: Props) {
    const params = useParams(); // Get params from the route
    const userID = params.userID;

    // Ensure userID is a string, not an array
    const uid = Array.isArray(userID) ? userID[0] : userID;

    if (!uid) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <>
            <TopBar uid={uid} />
            <GenericUserProfile uid={uid} />
        </>
    );
}
