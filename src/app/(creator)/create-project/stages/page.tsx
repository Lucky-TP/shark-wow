import FormStages from 'src/components/CreateProject/FormStages';
import Sidebar from 'src/components/CreateProject/Sidebar';

export default function Stages() {
  return (
    <div className="flex flex-row gap-10 p-4">
        <Sidebar/>
        <FormStages/> 
    </div>
  )
}