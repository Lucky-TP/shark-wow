"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { pagePath } from 'src/constants/routePath';
import { useAuth } from 'src/hooks/useAuth';
import { UserData } from 'src/interfaces/datas/user';
import { getSelf } from 'src/services/apiService/users/getSelf';

type Props = {};

export default function UserProfile({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
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
  console.log(user)
  return (
    <div>
      <section>
        <div className="min-h-screen bg-[#E5D8CA] flex items-start">
          <div className="w-full">
            <h1 className="text-7xl  text-black text-left ml-40 mt-20">{user?.username}</h1>
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
            <hr className="border-t-4 border-black w-4/5 my-8 ml-40" />
            <div className="bg-[#E5D8CA] flex items-center justify-normal">
              <div className="flex items-start mt-10 ml-60">
                <img
                  src="./nuk.jpg"  // Replace with your image path
                  alt="Profile"
                  className="rounded-full w-64 h-64 object-cover"
                />
              </div>
              <div className="text-black  text-3xl mb-6 ml-20 ">
                <p>{user?.address[0]?.country}</p>
                <p>
                  Website:{" "}
                  <a href="https://wtchai.com" className="text-blue-600">
                    https://wtchai.com
                  </a>
                </p>
              </div>
              <div className="flex flex-col space-y-6 ml-20">
                <a href={user?.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-3xl">
                  <FaFacebook />
                </a>  
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-3xl">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
                <FaYoutube />
                </a>
              </div>
            </div>
            </div>
        </div> 
      </section>
      <section>
        <div className="min-h-screen bg-[#E5D8CA] flex flex-col items-start p-10">
          <h2 className="text-3xl font-bold text-black mb-8 ml-20">About me</h2>
            <div className="bg-white w-full max-w-7xl h-80 rounded-lg shadow-lg p-6 ml-20">
              {/* เนื้อหาภายในกล่อง */}
            </div>
          <h2 className="text-3xl font-bold text-black mt-10 ml-20">Resume / CV</h2>
        </div>
      </section>
    </div>
   
  );
}