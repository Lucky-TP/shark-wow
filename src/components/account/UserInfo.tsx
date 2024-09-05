import { useRouter } from "next/navigation"
import { UserData } from "src/interfaces/datas/user"

type Props = {
    user?: UserData
}

export function UserInfo({user}:Props) {
    const router = useRouter();
    return (
        <>
        <div className="w-full flex justify-center">
            <h1 className="text-7xl text-black mt-20">{user?.username}</h1>
        </div>
        <div className="flex items-center justify-center space-x-10 mt-20">
            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"  onClick={() => router.push('/profile')}>
                Profile
            </button>
            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"  onClick={() => router.push('/my-project')}>
                Projects
            </button>
            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl" onClick={() => router.push('/contribution')}>
                Contribution
            </button>
            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl" onClick={() => router.push('/setting')}>
                Setting
            </button>
        </div>
        <div className="w-full flex justify-center">
            <hr className="border-t-4 border-black w-4/5 my-8" />
        </div>
        </>
    )
}