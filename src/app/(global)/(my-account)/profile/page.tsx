"use client";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { useAuth } from "src/hooks/useAuth";
import { signOut } from "src/services/authService";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";

import { pagePath } from "src/constants/routePath";
import { UserData } from "src/interfaces/datas/user";
import FileUpload from "src/components/global/FileUpload";
import { getSelf } from "src/services/apiService/users/getSelf";
import LoadingPage from "src/components/global/LoadingPage";

export default function ProfilePage() {
    const [user, setUser] = useState<UserData | null>();
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
                const result = await getSelf();
                setUser(result.data || null);
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
        return <LoadingPage/>;
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
                        <strong>My Projects </strong>
                        <ul>
                            {/* query all projects or some projects*/}
                            {user.ownProjects.map((project) => (
                            // {user.ownProjects.filter((project) => project.name.trim() !== "").map((project) => (
                                    <li key={project.projectId} className="mb-2 bg-white rounded-sm">
                                        <strong>Project Name: </strong> {project.name} <br />
                                        <strong>Description: </strong> {project.description} <br />
                                        <strong>Status: </strong> {project.status == 0 ? "Draft" : "Funding"} <br />
                                        <strong>Category: </strong> {project.category} <br />
                                        <strong>Total Supporter: </strong> {project.totalSupporter} <br />
                                        <strong>Total Quantity: </strong> {project.totalQuantity} <br />
                                        <strong>Cost Per Quantity: </strong> {project.costPerQuantity} <br />
                                        <strong>Website: </strong> {project.website} <br />
                                        <div className="mt-2">
                                            <strong>Images: </strong>
                                            <div className="flex space-x-2 mt-2">
                                                {project.carouselImageUrls.map((url, index) => (
                                                    <Image
                                                        key={index}
                                                        src={url}
                                                        alt={`Image ${index + 1}`}
                                                        className="w-24 h-24 object-cover rounded"
                                                        width={96}
                                                        height={96}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <strong>Recivied Comments: </strong>
                        {user.receivedComments.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Favorite Projects: </strong>
                        {user.favoriteProjectIds.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Popular Detail: </strong>
                        Total Project Success: {user.popularDetail.totalProjectSuccess}, Total
                        Supporter: {user.popularDetail.totalSupporter}
                    </div>
                    <div className="mb-2">
                        <strong>Comments Received: </strong>
                        <ul>
                            {user.receivedComments.map((comment) => (
                                <li key={comment.commentId}>{comment.detail}</li>
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
                        Facebook: {user.contact.facebook}, Twitter: {user.contact.X}, YouTube:{" "}
                        {user.contact.youtube}, Phone: {user.contact.phone}
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
