"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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

    let intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Store the intervalId with useRef

    const fetchUserData = useCallback(async () => {
        if (authUser) {
            try {
                const fetchedUserData = await getSelf();
                setUser(fetchedUserData.data);
                if (intervalIdRef.current) {
                    clearInterval(intervalIdRef.current); // Clear interval after data is fetched
                }
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
            intervalIdRef.current = setInterval(() => {
                if (!user) {
                    fetchUserData();
                }
            }, 1000);

            setTimeout(() => {
                if (intervalIdRef.current) {
                    clearInterval(intervalIdRef.current); // Ensure the interval is cleared after 3 seconds
                }
            }, 3000);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current); // Cleanup interval on unmount
            }
        };
    }, [authUser, authLoading, fetchUserData, user]);

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
