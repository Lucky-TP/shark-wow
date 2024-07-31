'use client'
import React, { useState } from 'react'


import MainProjectStory from './story/main'
import MainProjectStage from './stage/main'
import MainProjectUpdates from './updates/main'
import MainProjectDiscussion from './discussion/main'
import MainProjectToCreator from './toCreator/main'

type Props = {}

export default function MainProjectTabs({}: Props) {
    const [activeTab, setActiveTab] = useState('story')

    return (
        <section >
            <ul className='flex flex-row justify-between '>
                <li
                    className='bg-orange-200 w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-300 cursor-pointer'
                    onClick={() => setActiveTab('story')}
                >
                    <h2 className='text-xl font-semibold'>
                        Story
                    </h2>
                </li>
                <li
                    className='bg-orange-200 w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-300 cursor-pointer'
                    onClick={() => setActiveTab('stage')}
                >                    
                    <h2 className='text-xl font-semibold'>
                        Stages
                    </h2>
                </li>
                <li
                    className='bg-orange-200 w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-300 cursor-pointer'
                    onClick={() => setActiveTab('update')}
                >
                    <h2 className='text-xl font-semibold'>
                        Updates
                    </h2>
                </li>
                <li
                    className='bg-orange-200 w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-300 cursor-pointer'
                    onClick={() => setActiveTab('discussion')}
                >
                    <h2 className='text-xl font-semibold'>
                        Discussion
                    </h2>
                </li>
                <li
                    className='bg-orange-200 w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-300 cursor-pointer'
                    onClick={() => setActiveTab('to-creator')}
                >   
                    <h2 className='text-xl font-semibold'>
                        To Creator
                    </h2>
                </li>
            </ul>
            <section>
                {
                    activeTab === 'story' && (
                        <MainProjectStory/>
                    )
                }      
                {
                    activeTab === 'stage' && (
                        <MainProjectStage/>
                    )
                }  
                {
                    activeTab === 'update' && (
                        <MainProjectUpdates/>
                    )
                }  
                {
                    activeTab === 'discussion' && (
                        <MainProjectDiscussion/>
                    )
                }  
                {
                    activeTab === 'to-creator' && (
                        <MainProjectToCreator/>
                    )
                }        
            </section>
        </section>
    )
}