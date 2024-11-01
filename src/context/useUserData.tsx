"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
    initialData: UserData | null;
    children: React.ReactNode;
}

export const UserProvider = ({ children, initialData }: UserProviderProps) => {
    const [user, setUser] = useState<UserData | null>(initialData);
    const [loading, setLoading] = useState(true);
    const { user: authUser, authLoading } = useAuth();

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchUserData = useCallback(
        async (retryCount = 3) => {
            if (authUser) {
                for (let attempt = 0; attempt < retryCount; attempt++) {
                    try {
                        const fetchedUserData = await getSelf();
                        setUser(fetchedUserData.data);
                        setLoading(false);
                        return; // Exit if the fetch is successful
                    } catch (error) {
                        console.error(`Attempt ${attempt + 1} failed:`, error);
                        // Wait before retrying if it's not the last attempt
                        if (attempt < retryCount - 1) {
                            await delay(1000); // Delay before retrying
                        }
                    }
                }
                setUser(null); // If all attempts fail
            } else {
                setUser(null);
            }
            setLoading(false); // Set loading to false after attempts are complete
        },
        [authUser]
    );

    // Define refetchUserData function
    const refetchUserData = () => {
        setLoading(true); // Set loading to true before fetching
        fetchUserData(); // Call fetchUserData
    };

    useEffect(() => {
        if (!authLoading && authUser) {
            setLoading(true); // Set loading to true before fetching
            fetchUserData(); // Fetch user data when authUser is available
        } else {
            setLoading(false); // Ensure loading is false if there's no authUser
        }
    }, [authUser, authLoading, fetchUserData]);

    return (
        <UserContext.Provider value={{ user, setUser, refetchUserData, loading }}>
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
