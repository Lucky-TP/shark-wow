import FormPayment from "src/components/CreateProject/FormPayment";
import Sidebar from "src/components/CreateProject/Sidebar";

export default function Basics() {
    return (
        <>
            <div className="flex flex-row gap-10 p-4">
                <Sidebar/>
                <FormPayment/>
            </div>
        </>
    )
}