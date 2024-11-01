import { useRouter, usePathname } from "next/navigation";
import { UserData } from "src/interfaces/datas/user";
import { useState } from "react";
import { ArrowLeft, FileText, Layers, Bell } from "lucide-react";

type Props = {
    user?: UserData;
    projectId: string;
};

const buttons = [
    { label: "Project Report", path: "dashboard", icon: FileText },
    { label: "Stage", path: "stage", icon: Layers },
    { label: "Updates", path: "update", icon: Bell },
];

export function OperateInfo({ projectId }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const handleMouseEnter = (buttonName: string) => {
        setHoveredButton(buttonName);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div className="bg-white shadow-md rounded-lg mt-10 mx-auto max-w-4xl">
            <div className="flex items-center border-b border-gray-200">
                <button
                    onClick={() => router.push(`/creator/projects/launched`)}
                    className="flex items-center justify-center text-gray-600 font-medium py-4 px-6 hover:bg-gray-100 transition-colors duration-200 rounded-tl-lg"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                </button>
                {buttons.map((button) => {
                    const isActive = pathname === `/creator/projects/operate/${projectId}/${button.path}`;
                    const Icon = button.icon;
                    return (
                        <button
                            key={button.path}
                            className={`flex-1 flex items-center justify-center text-center py-4 px-6 transition-colors duration-200 ${
                                isActive || hoveredButton === button.path
                                    ? "bg-orange-400 text-white font-semibold"
                                    : "text-gray-600 hover:bg-orange-100"
                            }`}
                            onClick={() => router.push(`/creator/projects/operate/${projectId}/${button.path}`)}
                            onMouseEnter={() => handleMouseEnter(button.path)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Icon className="mr-2 h-5 w-5" />
                            {button.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function setIsLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}
