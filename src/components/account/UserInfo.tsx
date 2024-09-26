import { useRouter } from "next/navigation";
import { UserData } from "src/interfaces/datas/user";

type Props = {
    user?: UserData;
};

export function UserInfo({ user }: Props) {
    const router = useRouter();
    return (
        <section className="flex flex-col">
            <div className=" px-[5vw]">
                <h1 className="text-6xl text-gray-700 ">{user?.username}</h1>
            </div>
            <div className="flex flex-row w-full gap-x-[2vw] px-[3vw] py-[5vh]">
                <button
                    className="bg-orange-400 text-orange-50 font-semibold py-[1vh] px-[3vw] rounded-xl text-lg"
                    onClick={() => router.push("/profile")}
                >
                    Profile
                </button>
                <button
                    className="bg-orange-400 text-orange-50 font-semibold py-[1vh] px-[3vw] rounded-xl text-lg"
                    onClick={() => router.push("/supporter")}
                >
                    Supporter
                </button>
                <button
                    className="bg-orange-400 text-orange-50 font-semibold py-[1vh] px-[3vw] rounded-xl text-lg"
                    onClick={() => router.push("/creator")}
                >
                    Creator
                </button>
                <button
                    className="bg-orange-400 text-orange-50 font-semibold py-[1vh] px-[3vw] rounded-xl text-lg"
                    onClick={() => router.push("/contribution")}
                >
                    Contribution
                </button>
            </div>
            <div className="w-full flex justify-center">
                <hr className="border-t-4 border-gray-600 w-4/5 mb-[4vh]" />
            </div>
        </section>
    );
}
