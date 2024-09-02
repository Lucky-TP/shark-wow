import FormStages from 'src/components/CreateProject/FormStages';
import Sidebar from 'src/components/CreateProject/Sidebar';

export default function Stages({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex flex-col md:flex-row gap-10 p-6">
        <Sidebar/>
        <FormStages projectId={params.projectId}/> 
    </div>
  )
}