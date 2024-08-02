import FormBasic from "src/components/CreateProject/FormBasic";
import Sidebar from "src/components/CreateProject/Sidebar";

export default function CreateProject() {
    return (
        <>
            <div className="p-4 flex flex-row gap-10">
                <Sidebar/>
                <FormBasic/>
            </div>
        </>
    )
}