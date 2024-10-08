import FormStory from "src/components/CreateProject/FormStory";
import Sidebar from "src/components/CreateProject/Sidebar";

export default function Story({ params }: { params: { projectId: string } }) {
    return (
        <div className="flex flex-col md:flex-row gap-10 p-4">
            <Sidebar />
            <div className="flex flex-col">
                <FormStory projectId={params.projectId} />
            </div>
        </div>
    );
}
