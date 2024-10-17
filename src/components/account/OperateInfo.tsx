import { useRouter, usePathname } from "next/navigation";
import { UserData } from "src/interfaces/datas/user";
import { useState } from "react";

type Props = {
    user?: UserData;
    projectId: string;
};

const buttons = [
    { label: "Project Report", path: "dashboard" },
    { label: "Stage", path: "stage" },
    { label: "Updates", path: "update" },
];

export function OperateInfo({ projectId }: Props) {
    const router = useRouter();
    const pathname = usePathname(); // Get the current URL
    const [hoveredButton, setHoveredButton] = useState<string | null>(null); // State to track hovered button

    const handleMouseEnter = (buttonName: string) => {
        setHoveredButton(buttonName);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div className="flex items-center justify-center mt-10">
            {buttons.map((button) => (
                <button
                    key={button.path}
                    className={`text-black font-semibold py-10 px-40 text-center border-b-2 border-black ${
                        (pathname === `/creator/projects/operate/${projectId}/${button.path}` && !hoveredButton) ||
                        hoveredButton === button.path
                            ? "bg-[#FB923C]"
                            : ""
                    }`}
                    onClick={() => router.push(`/creator/projects/operate/${projectId}/${button.path}`)}
                    onMouseEnter={() => handleMouseEnter(button.path)}
                    onMouseLeave={handleMouseLeave}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
}
