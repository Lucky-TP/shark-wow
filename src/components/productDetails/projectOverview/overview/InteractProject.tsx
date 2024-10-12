import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useProjectDetails } from "src/context/useProjectDetails";

import { checkout } from "src/services/apiService/payments/checkout";

import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import { StripePaymentMethod } from "src/constants/paymentMethod";
import { TransactionType } from "src/interfaces/models/enums";
import { getSelf } from "src/services/apiService/users/getSelf";
import { Button, message } from "antd";
import { useUserData } from "src/context/useUserData";

type Props = {};

export default function InteractProject({}: Props) {
    const { user } = useUserData();
    const { ProjectInfo, isLoading } = useProjectDetails();

    const [donateAmount, setDonateAmount] = useState(0);

    const [donateLoading, setDonateLoading] = useState<boolean>(false);
    const onDonate = async () => {
        if (!user) {
            router.push("/sign-in");
            return;
        }

        if (donateAmount < 10) {
            message.error("Donate amount should equal or more than 10");
            return;
        }
        // console.log(user.data.uid === ProjectInfo.uid)
        if (user!.uid !== ProjectInfo.uid) {
            try {
                setDonateLoading(true);
                const payload: CheckoutPayload = {
                    projectId: ProjectInfo.projectId ?? "",

                    fundingCost: donateAmount,
                    paymentMethod: StripePaymentMethod.Card,
                    stageId: ProjectInfo.currentStage?.stageId!,
                    stageName: ProjectInfo.name ?? "",
                    transactionType: TransactionType.DONATE,
                };
                const response = await checkout(payload);
                if (response.status === 201) {
                    router.push(response.redirectUrl);
                }
            } catch (error: unknown) {
                message.error("Something went wrong - try again!");
            } finally {
                setDonateLoading(false);
            }
        } else {
            message.error("You are the creator of this project");
        }
    };

    const router = useRouter();
    return (
        <>
            <div>
                <form
                    className="mb-6 rounded-lg bg-white p-4 shadow-md"
                    onSubmit={(e) => {
                        // console.log(donateAmount)

                        e.preventDefault();

                        if (donateAmount <= 0 || Number.isNaN(donateAmount)) {
                            message.error("Please enter a valid amount");
                            return;
                        }

                        onDonate();
                    }}
                >
                    <h3 className="mb-2 text-xl font-semibold">Loves Creator</h3>
                    <label className="mb-2 block text-gray-600">Amount</label>
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            ฿
                        </span>
                        <input
                            type="number"
                            className="w-full rounded-lg border py-2 pl-8 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Love creator??? Donate now!!!"
                            onChange={(event) => {
                                setDonateAmount(Number(event.target.value));
                            }}
                        />
                    </div>
                    <Button
                        htmlType="submit"
                        loading={donateLoading}
                        className="w-full rounded-lg bg-orange-400 py-2 font-bold text-white hover:bg-orange-500"
                    >
                        Donate
                    </Button>
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
