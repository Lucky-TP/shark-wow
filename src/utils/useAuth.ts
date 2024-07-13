"use client";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "src/services/authService";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
    return user;
}
