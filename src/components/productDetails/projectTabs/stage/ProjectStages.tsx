'use client'

import React, { useState, useEffect, useRef } from 'react';


import { Stage } from 'src/interfaces/models/project';

import TargetStage from './TargetStage';

import { Skeleton } from 'antd';

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails';
import { dateToString } from 'src/utils/date';

interface Stages {
    stages: Stage[];
    status: number;
    isLoading: boolean;
}

// Dummy function to simulate fetching stages
async function onGetStages(): Promise<{ status: number, payload: { content: Stage[] } }> {
  // Simulate fetching data
  return {
    status: 200,
    payload: {
      content: [
        {
          fundingCost: 0,
          stageId: 0,
          name: "Planning Phase",
          startDate: dateToString(new Date('2023-01-01')),
          expireDate: dateToString(new Date('2023-02-01')),
          status: 0 ,
          detail: "This stage focuses on planning and initial groundwork for the project.",
          imageUrl: "https://example.com/images/planning_phase.jpg",
          currentFunding: 10000,
          goalFunding: 10000,
          totalSupporter: 200
        },
        {
          fundingCost: 0,
          stageId: 1,
          name: "Development Phase",
          startDate: dateToString(new Date('2023-03-01')),
          expireDate: dateToString(new Date('2023-05-01')),
          status: 1,
          detail: "This stage covers the development and implementation of the project.",
          imageUrl: "https://example.com/images/development_phase.jpg",
          currentFunding: 15000,
          goalFunding: 20000,
          totalSupporter: 500
        },
        {
          fundingCost: 0,
          stageId: 2,
          name: "Launch Phase",
          startDate: dateToString(new Date('2023-06-01')),
          expireDate: dateToString(new Date('2023-07-01')),
          status: 2,
          detail: "This stage aims to prepare the project for public launch and marketing.",
          imageUrl: "https://example.com/images/launch_phase.jpg",
          currentFunding: 0,
          goalFunding: 10000,
          totalSupporter: 0
        }
      ]
    }
  };
}

export default function ProjectStages() {
  const {
    ProjectInfo,
    isLoading,
    error,
  } = useProjectDetails()

  const [currentStage , setCurrentStage] = useState(ProjectInfo.currentStage);

  // Scrolling function
  const StageList = useRef<HTMLUListElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const listElement = StageList.current;
    if (listElement) {
      const handlePointerDown = (e: PointerEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - listElement.offsetLeft;
        scrollLeft.current = listElement.scrollLeft;
        listElement.style.cursor = 'grabbing';
        listElement.style.userSelect = 'none';
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - listElement.offsetLeft;
        const walk = (x - startX.current) * 2; // scroll-fast
        listElement.scrollLeft = scrollLeft.current - walk;
      };

      const handlePointerUp = () => {
        isDragging.current = false;
        listElement.style.cursor = 'grab';
        listElement.style.removeProperty('user-select');
      };

      listElement.addEventListener('pointerdown', handlePointerDown);
      listElement.addEventListener('pointermove', handlePointerMove);
      listElement.addEventListener('pointerup', handlePointerUp);
      listElement.addEventListener('pointerleave', handlePointerUp);

      return () => {
        listElement.removeEventListener('pointerdown', handlePointerDown);
        listElement.removeEventListener('pointermove', handlePointerMove);
        listElement.removeEventListener('pointerup', handlePointerUp);
        listElement.removeEventListener('pointerleave', handlePointerUp);
      };
    }
  }, []);

  return (
    <section className="items-center w-screen pt-[5vh] bg-orange-50">
      <ul
        className="flex flex-row items-center gap-8 overflow-x-scroll pt-[5vh] pb-[10vh] px-[5vw] active:cursor-grabbing h-full w-screen hide-scroll-bar"
        ref={StageList}
      >
        { ProjectInfo.stages !== undefined &&
          ProjectInfo.stages.map((stage: Stage, key) => (
            <TargetStage key={key} stage={stage}/>
          ))
        }
        {(isLoading || ProjectInfo.stages === null) &&
          <li>
            <Skeleton active />
          </li>
        }
      </ul>
    </section>
  );
}