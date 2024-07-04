// "use server";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "src/db/firebaseClient";

const useRequireAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push("/"); // Redirect to login page if not authenticated
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
};

export default useRequireAuth;
