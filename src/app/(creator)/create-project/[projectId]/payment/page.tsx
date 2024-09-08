import FormPayment from "src/components/CreateProject/FormPayment";
import Sidebar from "src/components/CreateProject/Sidebar";

export default function Payment({ params }: { params: { projectId: string } }) {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-10 p-6">
                <Sidebar />
                <FormPayment projectId={params.projectId} />
            </div>
        </>
    );
}
