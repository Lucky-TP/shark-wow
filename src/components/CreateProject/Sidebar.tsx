import Link from "next/link"

type Props = {}

export default function Sidebar() {
    return (
        <>
            <div className="flex flex-col">
                <Link href="">Basics</Link>
                <Link href="">Story</Link>
                <Link href="">Stages</Link>
                <Link href="">Payment</Link>
            </div>
        </>
    )
}