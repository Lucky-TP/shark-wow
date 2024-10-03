"use client"
import { useUserData } from "src/context/useUserData";
import { UserInfo } from "../account/UserInfo";
import PendingProjects from "./PendingProjects";

export default function Admin() {
    const { user, loading } = useUserData();
    return (
        <div>
            <UserInfo user={user || undefined} />
            <PendingProjects />
        </div>
    )
}