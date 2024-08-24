"use client"
import React from 'react';
import FormStages from 'src/components/CreateProject/FormStages';
import Sidebar from 'src/components/CreateProject/Sidebar';

const CkeditorPage = () => {
  return (
    <div className="flex flex-row gap-10 p-4">
        <Sidebar/>
        <FormStages/> 
    </div>
  );
};

export default CkeditorPage;
