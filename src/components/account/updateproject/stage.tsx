import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // นำเข้าไอคอนเครื่องหมายถูก
type Props = {};

export default function Stage({}: Props) {
    // เปลี่ยนชื่อเป็น UserProfile
    return (
        <div className="flex items-center justify-center mt-10 mb-20 bg-orange-50 ">
            <div className="bg-[#FB923C] rounded-lg border-4 border-blue-400 p-8 max-w-md">
                <h3 className="text-2xl font-semibold mb-4">Stage 1</h3>
                <p className="text-lg mb-6">Concept</p>

                <div className="flex items-center mb-4">
                    <AiOutlineCheckCircle className="text-green-600 h-8 w-8" />{" "}
                    {/* ใช้ไอคอนจาก react-icons */}
                    <p className="text-lg ml-3">Funding complete</p>
                </div>

                <div className="flex items-center mb-6">
                    <AiOutlineCheckCircle className="text-green-600 h-8 w-8" />{" "}
                    {/* ใช้ไอคอนจาก react-icons */}
                    <p className="text-lg ml-3">Project progress has been updated by creator</p>
                </div>

                <button className="mt-6 bg-gray-200 text-black font-semibold py-3 px-6 rounded-full text-lg">
                    Go to next stage
                </button>
            </div>
        </div>
    );
}
