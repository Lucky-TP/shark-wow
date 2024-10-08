import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useProjectDetails } from "src/context/useProjectDetails";

import { checkout } from "src/services/apiService/payments/checkout";

import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import { StripePaymentMethod } from "src/constants/paymentMethod";
import { TransactionType } from "src/interfaces/models/enums";
import { getSelf } from "src/services/apiService/users/getSelf";
import { message } from "antd";

type Props = {};


export default function InteractProject({}: Props) {
    const {
        ProjectInfo,
        isLoading
    } = useProjectDetails();

    const [donateAmount,setDonateAmount] = useState(0)

    const onDonate = async () => { 
        const user = await getSelf()
        // console.log(user.data.uid === ProjectInfo.uid)
        if (user.data.uid !== ProjectInfo.uid){
            const payload : CheckoutPayload = {
                projectId : ProjectInfo.projectId ?? "",

                fundingCost : donateAmount,
                paymentMethod : StripePaymentMethod.Card, 
                stageId : ProjectInfo.currentStage?.stageId!,
                stageName : ProjectInfo.name ?? "", 
                transactionType : TransactionType.DONATE
            }
            const response = await checkout(payload)
            if (response.status === 201 ){
                router.push(response.redirectUrl)
            }
        }else {
            message.error("You are not the creator of this project")
        }
    }

    const router = useRouter()
    return (
        <>
            <div>
                <form
                    className="mb-6 p-4 bg-white rounded-lg shadow-md"
                    onSubmit={
                        (e) => {
                            // console.log(donateAmount)

                            e.preventDefault();

                            if (donateAmount <= 0 || Number.isNaN(donateAmount)) {
                                message.error("Please enter a valid amount");
                                return;
                            }

                            onDonate()
                        }
                    }
                >
                    <h3 className="text-xl font-semibold mb-2">Loves Creator</h3>
                    <label className="block text-gray-600 mb-2">Amount</label>
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            ฿
                        </span>
                        <input
                            type="number "
                            className="pl-8 pr-3 py-2 border rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Love creator??? Donate now!!!"
                            onChange={(event)=>{
                                setDonateAmount(Number(event.target.value))
                            }}
                        />
                    </div>
                    <button 
                        className="w-full py-2 bg-orange-400 text-white font-bold rounded-lg hover:bg-orange-500"
                        type="submit"
                    >
                        Donate
                    </button>
                </form>

                {/* { !isLoading && <div className="space-y-4">
                    <button 
                        onClick={async ()=>{
                            
                        }}
                        className="w-full py-2 bg-orange-400 text-white font-bold rounded-lg hover:bg-orange-500"
                    >
                        Support this Project
                    </button>
                    <button
                        className="w-full py-2 bg-orange-400 text-white font-bold rounded-lg hover:bg-orange-500"
                    >
                        Add to favorite
                    </button>
                </div>} */}
            </div>
        </>
    );
}
