import React, { useEffect, useState } from 'react'

import { getUserById } from 'src/services/apiService/users/getUserById'

import { ProjectModel } from 'src/interfaces/models/project'


import { message, Skeleton } from 'antd'


type Props = Partial<ProjectModel> &  {
  isLoading?: boolean
  uid?: string
  stageId?: number 
  name?: string 
  description?: string
}

function formatDate(date : string )  {
  if(date === '') return ''
  const dateO = new Date(date); // Convert to Date object
  const day = String(dateO.getDate()).padStart(2, '0');
  const month = String(dateO.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = dateO.getFullYear();

  return `${day}/${month}/${year}` ;
}


export default function ProjectOverviewInfo({
  isLoading,
  uid,
  stageId,
  name,
  description
  // current stage 
}: Props) {

  const [userInfomation, setUserDetails] = useState({
    uid: uid,
    name: '' as string | undefined,
    imageUrl : '' as string | undefined,
    date: '' as string | undefined,
  })

  const [isFirstTime, setFirstTime ] = useState(true)

  const OnGettingUserDetails = async ()=>{
    try{
      const response = await getUserById(uid as string)
      const data = response.data
      console.log(data)

      setUserDetails({
        ...userInfomation,
        name: data?.username ,
        imageUrl: data?.profileImageUrl,
        date: data?.birdthDate
      })
    }catch(error){
      message.error("User data not found!");
    }
  }

  

  useEffect(()=>{
    //isLoading goes to false 
    
    if(!isLoading){
      OnGettingUserDetails()
      setFirstTime(false)
    }

  },[isLoading])

  return (
    <>
      {
        (isLoading || isFirstTime) && 
        <>
          <Skeleton
            avatar
            paragraph={{ rows: 0 }}
          />
          <Skeleton
            paragraph={{ rows: 3 }}
          />        
        </>
      }
      {
        !isLoading && 
        <>
          <div className='flex flex-row items-center gap-x-[2vw] '>
            <div className="rounded-full">
              <img
                src={userInfomation.imageUrl}
                className="rounded-full max-w-[5vw]"/>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{userInfomation.name}</h2>
              <p className="text-gray-600">Created at {userInfomation.date !==undefined ? formatDate(userInfomation.date) : ""}</p>
            </div>
          </div>
          <div>
              <div className='flex flex-row justify-between'>
                <h3 className="text-lg font-semibold">Current Stage 1 :</h3>
                <h3 className='text-lg font-medium'>Concept</h3>
              </div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-gray-600 mb-4">{description}</p>
          </div> 
        </>       
      }

    </>
  )
}