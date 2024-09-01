"use client"
import { message } from 'antd';
import React, { useEffect } from 'react'

import MainProjectOverview from 'src/components/productDetails/projectOverview/MainProjectOverview'
import MainProjectTabs from 'src/components/productDetails/projectTabs/MainProjectTabs'
import { getProjectById } from 'src/services/apiService/projects/getProjectById'

export default function Page({ params }: { params: { projectID: string } }) {
    // console.log('getting project ?Id ',params.projectID)
    const projectID = params.projectID
    useEffect(() => {
        const fetchProjectData = async () => {
          if (projectID) {
            try {
              const project = await getProjectById(projectID);
              const projectData = project.data;
            } catch (error) {
              message.error("Failed to load project data.");
              console.error(error);
            }
          }
        };
        fetchProjectData();
    }, [projectID]);
    return (
        <section className='flex flex-col w-screen'>
            <MainProjectOverview/>
            <MainProjectTabs/>
        </section>
    )
}