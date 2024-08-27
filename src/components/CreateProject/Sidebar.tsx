"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type Props = {}

export default function Sidebar() {
    const pathName = usePathname()

    const links = [
        { href: "/create-project/basic", label: "Basic" },
        { href: "/create-project/story", label: "Story" },
        { href: "/create-project/stages", label: "Stages" },
        { href: "/create-project/payment", label: "Payment" },
    ]

    return (
        <div className="flex flex-col p-4 bg-gray-100 rounded-md shadow-md h-fit">
            {links.map((link) => (
                <Link href={link.href} key={link.label} className={pathName === link.href ? "text-lg text-orange-600 font-bold" : "text-base text-orange-500 hover:text-blue-700"}>
                    {link.label}
                </Link>
            ))}
        </div>
    )
}
