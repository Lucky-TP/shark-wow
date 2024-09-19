"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    initialData: UserData | null;
    children: React.ReactNode;
}

export const UserProvider = ({ children, initialData }: UserProviderProps) => {
    const [user, setUser] = useState<UserData | null>(initialData);
    const [loading, setLoading] = useState(true);
    const { user: authUser, authLoading } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (authUser) {
                try {
                    const fetchedUserData = await getSelf();
                    setUser(fetchedUserData?.data!);
                    clearInterval(intervalId);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        };

        let intervalId: NodeJS.Timeout;
        if (!authLoading) {
            intervalId = setInterval(() => {
                fetchUserData();
            }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
            }, 3000);
        }
    }, [authUser, authLoading]);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
};
