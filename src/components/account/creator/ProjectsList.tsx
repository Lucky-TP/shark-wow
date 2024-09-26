import React, { useEffect, useState } from 'react';
import { useProjectsCreatedByCreator } from 'src/context/creatorDashboard/useProjectsCreatedByCreator';
import LoadingSection from "src/components/global/LoadingSection";
import ProjectsLaunched from './ProjectsLaunched';
import ProjectsDrafted from './ProjectsDrafted';
import { Dropdown } from 'antd';
import ProjectsEnd from './ProjectsEnd';

export default function ProjectsList({ projectType }: { projectType: string }) {
  const { payload, OnChangeProjectStageType,OnGettingProjectCreatedByCreator } = useProjectsCreatedByCreator(); // Assuming payload holds project data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    OnGettingProjectCreatedByCreator().then(() => {
        setLoading(false);
    });
}, []);

if (loading) {
    return <LoadingSection/>;
}
  



  // Render content based on projectType
  const renderProjectSection = () => {
    switch (projectType) {
      case 'launched':
        return <ProjectsLaunched/>
            
      case 'drafted':
        return <ProjectsDrafted/>
      case 'end':
        return <ProjectsEnd/>
      case 'end':
        return <div className='text-gray-700 text-lg font-extrabold pl-3 pt-4'>Project End</div>;
      
      default:
        return <div className='text-gray-700 text-lg font-extrabold pl-3 pt-4'>No specific projects found</div>;
    }
  };

  return (
    <div className='w-full px-[4vw]'>
        {renderProjectSection()}
    </div>
      
  );
}
