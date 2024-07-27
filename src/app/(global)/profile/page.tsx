"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { Button } from "antd";
import { useAuth } from "src/utils/useAuth";
import { signOut } from "src/services/authService";
import { apiPath, pagePath } from "src/constants/routePath";
import { UserModel } from "src/interfaces/models/user";
import { GetUserResponse } from "src/interfaces/response/userResponse";
import FileUpload from "src/components/FileUpload";

export default function ProfilePage() {
    const [user, setUser] = useState<UserModel>();
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
                    <img
                        src={user.profileImageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="rounded-full w-32 h-32 mb-4"
                    />
                    <div className="mb-2">
                        <strong>Name: </strong>
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="mb-2">
                        <strong>Email: </strong>
                        {user.email}
                    </div>
                    <div className="mb-2">
                        <strong>Role: </strong>
                        {user.role}
                    </div>
                    <div className="mb-2">
                        <strong>My Projects: </strong>
                        {user.myProjectIds.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Favorite Projects: </strong>
                        {user.favoriteProjectIds.join(", ")}
                    </div>
                    <div className="mb-2">
                        <strong>Comments Received: </strong>
                        <ul>
                            {user.receivedComments.map((comment) => (
                                <li key={comment.commentId}>
                                    {comment.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <strong>Transaction Logs: </strong>
                        <ul>
                            {user.transactionLogs.map((log) => (
                                <li key={log.projectId}>
                                    Project ID: {log.projectId}, Stage ID:{" "}
                                    {log.stageId}, Cost: {log.cost}, Type:{" "}
                                    {log.type}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <FileUpload />
                    <Button onClick={handleSignOut} type="primary">
                        SignOut
                    </Button>
                </div>
            )}
        </div>
    );
}
