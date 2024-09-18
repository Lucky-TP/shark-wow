"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { UserData } from "src/interfaces/datas/user";
import { getSelf } from "src/services/apiService/users/getSelf";

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    loading: boolean;
    refetchUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const { user: authUser, authLoading } = useAuth();

    const fetchUserData = useCallback(async () => {
        if (authUser) {
            try {
                const fetchedUserData = await getSelf();
                setUser(fetchedUserData?.data ?? null);
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
    }, [authUser]);

    // Define refetchUserData function
    const refetchUserData = () => {
        setLoading(true); // Set loading to true before fetching
        fetchUserData(); // Call fetchUserData
    };

    useEffect(() => {
        if (!authLoading) {
            fetchUserData();
        }
    }, [authUser, authLoading, fetchUserData]);
    
    return (
        <UserContext.Provider value={{ user, setUser, loading, refetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
};