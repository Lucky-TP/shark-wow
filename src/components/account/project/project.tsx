import React from 'react';
type Props = {};
export default function UserProject({}: Props) {
    return (
        <div>
            <section>
                <div className="min-h-screen bg-[#E5D8CA] flex items-start">
                    <div className="w-full">
                        <h1 className="text-7xl  text-black text-left ml-40 mt-20">Chai kuaytoeykuayhee</h1>
                    </div>
                        <div className="flex items-start ml-72 space-x-10 mt-20">
                            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                                Profile
                            </button>
                            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                                Projects
                            </button>
                            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                                Contribution
                            </button>
                            <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                                Setting
                            </button>
                        </div>
                </div>
            </section>
        </div>
    );
}