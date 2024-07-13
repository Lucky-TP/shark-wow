"use client";
import Link from "next/link";
import { pagePath } from "src/constants/routePath";

export default function RootPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Link
                href={pagePath.SIGNIN}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Go to signin
            </Link>
        </div>
    );
}
