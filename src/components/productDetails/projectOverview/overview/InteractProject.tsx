import React from "react";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

type Props = {};

export default function InteractProject({}: Props) {
    const context = useProjectDetails();
    // Adding function support & donate handler payload having project id uid amount current stage price of the project sending to backend migrate payment
    return (
        <>
            <div>
                <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">
                        Loves Creator
                    </h3>
                    <label className="block text-gray-600 mb-2">Amount</label>
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            $
                        </span>
                        <input
                            type="text"
                            className="pl-8 pr-3 py-2 border rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="xxx"
                        />
                    </div>
                    <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
                        Donate
                    </button>
                </div>

                <div className="space-y-4">
                    <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
                        Support this Project
                    </button>
                    <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
                        Add to favorite
                    </button>
                </div>
            </div>
        </>
    );
}
