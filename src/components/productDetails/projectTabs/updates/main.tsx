import React, { useEffect, useState } from 'react'

import UpdateBlog from './updateBlog'

import { Update } from 'src/interfaces/models/project'
import { Divider } from 'antd'

interface updatesStateType { 
    update : Update[],
    loading :  boolean,
    currentUpdate : number ,
}

const exampleData : Update[] = [
    {
      id: 1,
      detail: "Creating project number 1",
      date: new Date(),
      belongTo: 0,
    },
    {
      id: 2,
      detail: "Hey guys we are updating",
      date: new Date(),
      belongTo: 3,
    },
    {
      id: 3,
      detail: "Prototype stage is designing now ",
      date: new Date(),
      belongTo: 1,
    },
    {
      id: 4,
      detail: "Prototype done",
      date: new Date(),
      belongTo: 1,
    },
    {
      id: 5,
      detail: "Production we found it brother",
      date: new Date(),
      belongTo: 2,
    }
]

export default function MainProjectUpdates() {

  const [updateState, setUpdateState] = useState<updatesStateType>({
    update: [],
    loading: true,
    currentUpdate: 0,
  })

  useEffect(()=>{

    setUpdateState({
      ...updateState,
      update: exampleData,
      loading: false,
    })
      
  },[])

  return (
      <section className='flex flex-row w-full justify-between px-[5vw]'>
          <nav className='flex flex-col  min-w-fit items-center'>
              <h1 className='text-2xl font-semibold  mb-[3vh]'>Progression</h1>
              <ul className='flex flex-col gap-y-[3vh] '>
                  {updateState.update.map((update,index) => (
                      <li
                        key={update.id}
                        onClick={()=>{
                          setUpdateState({
                            ...updateState,
                            currentUpdate: index
                          })
                        }}
                        className='flex items-center justify-center p-3 bg-orange-300 rounded-xl w-full px-[1vw] shadow-lg
                                  hover:bg-orange-400 hover:scale-[1.02] duration-500 transition-all cursor-pointer '
                      >
                          <p className='text-lg text-gray-700 font-medium text-center'>
                            {update.detail}
                          </p>
                      </li>
                  ))}
              </ul>
          </nav>
          <Divider
              type="vertical"
              className='h-full flex mx-[2vw] bg-gray-700'
          />
          <div className=''>
            { !updateState.loading && <UpdateBlog
                data={updateState.update[updateState.currentUpdate]}
            />}
          </div>
      </section>
  )
}