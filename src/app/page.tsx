"use client";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "src/db/firebaseClient"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";

const HomePage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                router.push("/profile");
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignInWithEmailAndPassword = async () => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = result.user;
            setUser(user);
            setError(null);
            router.push("/profile");
        } catch (error: any) {
            console.error(
                "Error signing in with email and password:",
                error.message
            );
            setError(error.message);
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            setError(null);
            router.push("/profile");
        } catch (error: any) {
            console.error("Error signing in with Google:", error.message);
            setError(error.message);
        }
    };

    const handleRegisterWithEmailAndPassword = async () => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = result.user;
            setUser(user);
            setError(null);
            router.push("/profile");
        } catch (error: any) {
            console.error(
                "Error registering with email and password:",
                error.message
            );
            setError(error.message);
        }
    };

    const toggleRegisterMode = () => {
        setIsRegistering((prev) => !prev);
        setError(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">
                Welcome to Next.js with Firebase
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {user ? (
                    <div className="text-center">
                        <p className="mb-4">
                            Signed in as{" "}
                            <span className="font-medium">{user.email}</span>
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-4"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="password"
                                className="mb-1 font-medium"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={
                                    isRegistering
                                        ? handleRegisterWithEmailAndPassword
                                        : handleSignInWithEmailAndPassword
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {isRegistering ? "Register" : "Sign In"}
                            </button>
                            <button
                                onClick={handleSignInWithGoogle}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Sign In with Google
                            </button>
                            <button
                                type="button"
                                onClick={toggleRegisterMode}
                                className="text-blue-500 hover:underline"
                            >
                                {isRegistering
                                    ? "Already have an account? Sign In"
                                    : "Don't have an account? Register"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default HomePage;
