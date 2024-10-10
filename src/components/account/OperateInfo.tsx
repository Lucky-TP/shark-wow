import { useRouter } from "next/navigation";
import { UserData } from "src/interfaces/datas/user";
import Link from "next/link";
type Props = {
    user?: UserData;
};

export function UserInfo({ user }: Props) {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center  mt-10">
             


            <Link href="/creator/projects/operate/dashboard" className="text-black hover:bg-[#FB923C] font-semibold py-10 px-40 text-center border-b-2 border-black">
                Project Report
            </Link>
        
            <Link href="/creator/projects/operate/stage" className="text-black hover:bg-[#FB923C] font-semibold py-10 px-40 text-center border-b-2 border-black">
                Stage
            </Link>
        
            <Link href="/creator/projects/operate/update" className="text-black hover:bg-[#FB923C] font-semibold py-10 px-40 text-center border-b-2 border-black">
                Updates
            </Link>
        </div>
    );
}