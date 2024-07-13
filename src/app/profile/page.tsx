"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { useAuth } from "src/utils/useAuth";
import { signOut } from "src/services/authService";

export default function ProfilePage() {
    const user: User | null = useAuth();
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error: any) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <Head>
                <title>User Profile</title>
                <meta name="description" content="User Profile Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <div className="flex items-center justify-center mb-4">
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                priority={true}
                                width={300}
                                height={300}
                                alt="User Photo"
                                className="w-20 h-20 rounded-full"
                            />
                        ) : (
                            <Image
                                src={"/surprised-emoji-svgrepo-com.svg"}
                                priority={true}
                                width={300}
                                height={300}
                                alt="User Photo"
                                className="w-20 h-20 rounded-full"
                            />
                        )}
                    </div>
                    <p className="mb-4">
                        Welcome,{" "}
                        <span className="font-medium">{user.email}</span>
                    </p>
                    <p className="text-sm text-gray-500">User ID: {user.uid}</p>
                    <Link href={"/dashboard"} className="mb-4 text-blue-400">
                        Click me to test database!
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 self-end"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
