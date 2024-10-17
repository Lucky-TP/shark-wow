import { useRouter } from "next/navigation";
import { UserData } from "src/interfaces/datas/user";
import Link from "next/link";
type Props = {
    user?: UserData;
    projectId: string;
};

export function OperateInfo({ projectId }: Props) {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center  mt-10">
             
            <button className="text-black hover:bg-[#FB923C] font-semibold py-10 px-40 text-center border-b-2 border-black"
            onClick={() => router.push(`/creator/projects/operate/${projectId}/dashboard`)}>
                 Project Report
            </button> 

            <button className="text-black hover:bg-[#FB923C] font-semibold py-10 px-40 text-center border-b-2 border-black"
            onClick={() => router.push(`/creator/projects/operate/${projectId}/stage`)}>
                 Stage
            </button>

            <button className="text-black hover:bg-[#FB923C] font-semibold py-10 px-40 text-center border-b-2 border-black"
            onClick={() => router.push(`/creator/projects/operate/${projectId}/update`)}>
                 Updates
            </button>
            
        </div>
    );
}