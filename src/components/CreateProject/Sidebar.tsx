"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export default function Sidebar() {
    const pathName = usePathname();

    // Extract project ID from the current pathname
    const projectIdMatch = pathName.match(/\/create-project\/([a-zA-Z0-9]+)/);
    const projectId = projectIdMatch ? projectIdMatch[1] : "";

    const links = [
        { href: `/create-project/${projectId}/basic`, label: "Basic" },
        { href: `/create-project/${projectId}/story`, label: "Story" },
        { href: `/create-project/${projectId}/stages`, label: "Stages" },
        { href: `/create-project/${projectId}/payment`, label: "Payment" },
    ];

    return (
        <div className="flex flex-row md:flex-col items-center gap-1 p-4 bg-gray-100 rounded-md shadow-md h-fit justify-between">
            {links.map((link) => (
                <Link
                    href={link.href}
                    key={link.label}
                    className={
                        pathName === link.href
                            ? "text-lg text-orange-600 font-bold"
                            : "text-base text-orange-500 hover:text-blue-700"
                    }
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
