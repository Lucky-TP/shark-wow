"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Buttonseemore from "src/components/account/project/ButtonSeeMore";
import CarouselProductCard from 'src/components/NewProductCard/CarouselProduct/CarouselProductCard';
import { pagePath } from 'src/constants/routePath';
import { useAuth } from 'src/hooks/useAuth';
import { UserData } from 'src/interfaces/datas/user';
import { getSelf } from 'src/services/apiService/users/getSelf';

type Props = {};

export default function Myproject({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
    const [user, setUser] = useState<UserData | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const { user: authUser, authLoading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                if (!authUser) {
                    router.push(pagePath.SIGNIN);
                    return;
                }
                const result = await getSelf();
                setUser(result.data || null);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };
        if (!authLoading) {
            fetchUserProfile();
        }
    }, [authUser]);
  return (
      <section>
        <div className=" bg-[#E5D8CA] flex items-start">
          <div className="w-full">
            <h1 className="text-7xl  text-black text-left ml-40 mt-20">chai skibidi</h1>
          <div className="flex items-start ml-72 space-x-10 mt-20">
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"  onClick={() => router.push('/profiletoy')}>
                Profile
              </button>
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl"  onClick={() => router.push('/my-project')}>
                Projects
              </button>
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl" onClick={() => router.push('/contribution')}>
                Contribution
              </button>
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                Setting
              </button>
            </div>
            <hr className="border-t-4 border-black w-4/5 my-8 ml-40" />
        </div>
        </div>
        <div className=" bg-[#E5D8CA] flex items-start">
             <div className="w-full">
                <h1 className="text-5xl text-black text-left mt-20 ml-40">project</h1>
            </div>
        </div>
        <CarouselProductCard title = "" data = {user?.ownProjects}/>
        <Buttonseemore/>
   </section>
   
   
   

  );
}
