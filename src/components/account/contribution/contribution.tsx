"use client"
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { pagePath } from 'src/constants/routePath';
import { useAuth } from 'src/hooks/useAuth';
import { UserData } from 'src/interfaces/datas/user';
import { getSelf } from 'src/services/apiService/users/getSelf';
import { UserInfo } from '../UserInfo';
type Props = {};

export default function Contribution({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  const [user, setUser] = useState<UserData>();
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
              setUser(result.data);
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
    <div>
      <section>
        <div className=" bg-[#E5D8CA] flex items-start">
          <div className="w-full">
            <UserInfo user={user}/>
        </div>
        </div>
   </section>
   </div>

  );
}