import { useRouter } from "next/navigation";
import { UserData } from "src/interfaces/datas/user";

type Props = {
    user?: UserData;
};

export function UserInfo({ user }: Props) {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center  mt-10">
      
            <button className="text-black hover:bg-[#D2825E] font-semibold py-10 px-40 text-center border-b-2 border-black">
                Project Report
            </button>
        
            <button className="text-black hover:bg-[#D2825E] font-semibold py-10 px-40 text-center border-b-2 border-black">
                Stage
            </button>
        
            <button className="text-black hover:bg-[#D2825E] font-semibold py-10 px-40 text-center border-b-2 border-black">
                Updates
            </button>
        </div>
    );
}