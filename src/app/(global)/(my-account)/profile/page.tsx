"use client";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";


import { useAuth } from "src/utils/useAuth";
import { signOut } from "src/services/authService";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";

import { apiPath, pagePath } from "src/constants/routePath";
import { GetUserResponse } from "src/interfaces/response/userResponse";

import FileUpload from "src/components/global/FileUpload";
import { UserDataWithDate } from "src/interfaces/models/common";

export default function ProfilePage() {
    const [user, setUser] = useState<UserDataWithDate | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const { user: authUser, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                if (!authUser) {
                    router.push(pagePath.SIGNIN);
                    return;
                }
                const response: AxiosResponse<GetUserResponse> =
                    await axios.get(apiPath.USERS.GET_SELF);
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };
        if (!authLoading) {
            fetchUserProfile();
        }
    }, [authUser]);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error: any) {
            console.error("Error signing out:", error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center">
            {user && (
                <div className="mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    {user.profileImageUrl && (
                        <Image
                            src={user.profileImageUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="rounded-full w-32 h-32 mb-4"
                            width={300}
                            height={300}
                        />
                    )}
                    <div className="mb-2">
                        <strong>Username: </strong>
                        {user.username}
                    </div>
                    <div className="mb-2">
                        <strong>Name: </strong>
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="mb-2">
                        <strong>Email: </strong>
                        {user.email}
                    </div>
                    <div className="mb-2">
                        <strong>About Me: </strong>
                        {user.aboutMe}
                    </div>
                    <div className="mb-2">
                        <strong>My Projects: </strong>
                        {user.ownProjectIds.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Favorite Projects: </strong>
                        {user.favoriteProjectIds.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Popular Detail: </strong>
                        Total Project Success:{" "}
                        {user.popularDetail.totalProjectSuccess}, Total
                        Supporter: {user.popularDetail.totalSupporter}
                    </div>
                    <div className="mb-2">
                        <strong>Comments Received: </strong>
                        <ul>
                            {user.receivedComments.map((comment) => (
                                <li key={comment.commentId}>
                                    {comment.detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <strong>Interest Categories: </strong>
                        {user.interestCategories.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Address: </strong>
                        {/* {user.address.country}, {user.address.city},{" "}
                        {user.address.province}, {user.address.postalCode} */}
                    </div>
                    <div className="mb-2">
                        <strong>Contact: </strong>
                        Facebook: {user.contact.facebook}, Twitter:{" "}
                        {user.contact.X}, YouTube: {user.contact.youtube},
                        Phone: {user.contact.phone}
                    </div>
                    <div className="mb-2">
                        <strong>CV URL: </strong>
                        {user.cvUrl}
                    </div>
                    <FileUpload />
                    <Button onClick={handleSignOut} type="primary">
                        Sign Out
                    </Button>
                </div>
            )}
        </div>
    );
}
