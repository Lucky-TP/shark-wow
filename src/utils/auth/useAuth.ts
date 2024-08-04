"use client";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "src/services/authService";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setAuthLoading(false); // Set authLoading to false once the auth state is known
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return { user, authLoading };
}
