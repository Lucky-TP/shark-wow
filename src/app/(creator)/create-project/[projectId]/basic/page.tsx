import FormBasic from "src/components/CreateProject/FormBasic";
import Sidebar from "src/components/CreateProject/Sidebar";

export default function Basic({ params }: { params: { projectId: string } }) {
    return (
        <div className="flex flex-col md:flex-row gap-10 p-6">
            <Sidebar/>
            <FormBasic projectId={params.projectId}/>
        </div>
    )
}