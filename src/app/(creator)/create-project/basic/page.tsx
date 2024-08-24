import FormBasic from "src/components/CreateProject/FormBasic";
import Sidebar from "src/components/CreateProject/Sidebar";

export default function Basic() {
    return (
        <>
            <div className="flex flex-row gap-10 p-4">
                <Sidebar/>
                <FormBasic/>
            </div>
        </>
    )
}