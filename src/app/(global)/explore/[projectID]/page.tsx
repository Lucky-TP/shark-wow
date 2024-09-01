"use client"
import React, { useEffect, useState } from 'react'

import MainProjectOverview from 'src/components/productDetails/projectOverview/MainProjectOverview'
import MainProjectTabs from 'src/components/productDetails/projectTabs/MainProjectTabs'

import { getProjectById } from 'src/services/apiService/projects/getProjectById'

import { ProjectModel } from 'src/interfaces/models/project';

import { message } from 'antd';

import { ProjectDetialResponse } from 'src/interfaces/datas/projectDetailStatus';

export default function Page({ params }: { params: { projectID: string } }) {
    // console.log('getting project ?Id ',params.projectID)
    const projectID = params.projectID

    const [ProjectResponse,SetProjectResponse] = useState<ProjectDetialResponse>({
        projectData: undefined,
        isLoading: true,
        error: false
    })

    const fetchProjectData = async () => {
      if (projectID) {
        try {

          SetProjectResponse({
            ...ProjectResponse,
            isLoading : true
          })

          const response = await getProjectById(projectID);
          const data =  response.data;

          // await new Promise(resolve => setTimeout(resolve, 500));

          SetProjectResponse({
            ...ProjectResponse,
            projectData: data,
            isLoading : false
          })

        } catch (error) {
          message.error("Failed to load project data.");
          SetProjectResponse({
            ...ProjectResponse,
            error: true
          })
        }
      }
    }

    useEffect(() => {
        fetchProjectData();
    }, []);

    return (
        <section className='flex flex-col w-screen'>
              <>
                  <MainProjectOverview isLoading={ProjectResponse.isLoading} projectData={ProjectResponse.projectData} error={ProjectResponse.error}/>
                  <MainProjectTabs isLoading={ProjectResponse.isLoading} projectData={ProjectResponse.projectData} error={ProjectResponse.error}/>               
              </>                   
        </section>
    )
}