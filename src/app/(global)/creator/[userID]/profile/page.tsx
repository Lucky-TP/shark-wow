"use client";
import React from "react";
import { useParams } from "next/navigation"; // Import useParams
import CreatorProfile from "src/components/CreatorAccount/CreatorProfile";
import CreatorAccountNavbar from "src/components/CreatorAccount/CreatorAccountNavbar";

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
            <CreatorAccountNavbar uid={uid} />
            <CreatorProfile uid={uid} />
        </>
    );
}
