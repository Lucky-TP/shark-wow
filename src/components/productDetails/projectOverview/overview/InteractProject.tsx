import React from "react";

import { useRouter } from "next/navigation";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

import { checkout } from "src/services/apiService/payments/checkout";

import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import { StripePaymentMethod } from "src/constants/paymentMethod";
import { TransactionType } from "src/interfaces/models/enums";

type Props = {};


export default function InteractProject({}: Props) {
    const {
        ProjectInfo,
        isLoading
    } = useProjectDetails();

    const router = useRouter()
    return (
        <>
            <div>
                <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Loves Creator</h3>
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

                { !isLoading && <div className="space-y-4">
                    <button 
                        onClick={async ()=>{
                            const payload : CheckoutPayload = {
                                projectId : ProjectInfo.projectId ?? "",
                                fundingCost : 1000,
                                paymentMethod : StripePaymentMethod.Bitcoin, 
                                stageId : ProjectInfo.currentStage?.stageId!,
                                stageName : ProjectInfo.name ?? "", 
                                transactionType : TransactionType.FUNDING
                            }
                            const response = await checkout(payload)
                            if (response.status === 201 ){
                                router.push(response.redirectUrl)
                            }
                        }}
                        className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
                    >
                        Support this Project
                    </button>
                    <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
                        Add to favorite
                    </button>
                </div>}
            </div>
        </>
    );
}
