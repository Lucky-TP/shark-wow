"use client";
import { UserProvider } from "src/context/useUserData";
import { UserData } from "src/interfaces/datas/user";

type Props = {
    children: React.ReactNode;
    initialData: UserData | null;
};

export default function SessionWrapper({ children, initialData }: Props) {
    return <UserProvider initialData={initialData}>{children} </UserProvider>;
}
