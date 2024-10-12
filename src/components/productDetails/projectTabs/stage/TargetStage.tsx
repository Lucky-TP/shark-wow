import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useProjectDetails } from "src/context/useProjectDetails";

import { StripePaymentMethod } from "src/constants/paymentMethod";
import { checkout } from "src/services/apiService/payments/checkout";

import { Stage } from "src/interfaces/models/project";
import { StageStatus, TransactionType } from "src/interfaces/models/enums";
import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";

import Image from "next/image";
import { useUserData } from "src/context/useUserData";
import { message } from "antd";

type Props = {
    stage: Stage;
};

enum ButtonStatus {
    SUPPORT = "SUPPORT",
    UNAVALIABLE = "UNAVALIABLE",
    LAUNCHED = "LAUNCHED",
    EXPIRED = "EXPIRED",
}


function formatOwnerShip(goalStageFunding: number, goalProjectFunding: number) {
    return (goalStageFunding / goalProjectFunding) * 100;
}

function formateEstimatedDate(endDate: string): string {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff < 0) {
        return "Stage is already launch";
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days} days, ${hours} hours, ${minutes} minutes lefts`;
}

export default function TargetStage({ stage }: Props) {
    const { ProjectInfo } = useProjectDetails();
    const { user } = useUserData();
    const router = useRouter();
    const [supportLoading, setSupportLoading] = useState<boolean>(false);

    const handleCheckout = async () => {
        if (!user) {
            router.push("/sign-in");
            return;
        }

        if (user?.uid !== ProjectInfo.uid) {
            setSupportLoading(true);
            try {
                const payload: CheckoutPayload = {
                    projectId: ProjectInfo.projectId ?? "",
                    fundingCost: Number(
                        (stage.goalFunding / (ProjectInfo?.totalQuantity || 1)).toFixed(2)
                    ),
                    paymentMethod: StripePaymentMethod.Card,
                    stageId: stage.stageId,
                    stageName: ProjectInfo.name ?? "",
                    transactionType: TransactionType.FUNDING,
                };

                const response = await checkout(payload);

                if (response.status === 201) {
                    router.push(response.redirectUrl);
                }
            } catch (error: unknown) {
                message.error("Something went wrong - try again!");
            } finally {
                setSupportLoading(false);
            }
        } else {
            message.error("You are owner of this project");
        }
    };

    return (
        <li
            key={stage.stageId}
            className="flex h-fit cursor-pointer flex-col rounded-lg border border-orange-200 transition-all duration-700 hover:bg-orange-100"
        >
            <div>
                {ProjectInfo.carouselImageUrls?.[0] !== undefined && (
                    <Image
                        src={ProjectInfo.carouselImageUrls?.[0]}
                        alt=""
                        width={500}
                        height={400}
                        className="w-full cursor-pointer rounded-t-lg"
                        draggable={false}
                    />
                )}
            </div>
            <div className="flex flex-col gap-y-[1vh] px-[2vw] py-[2vh]">
                <div>
                    <div className="flex flex-row justify-between gap-x-[2vw]">
                        <h3 className="text-lg font-semibold text-gray-700">
                            1x {ProjectInfo.name}
                        </h3>
                        <h3 className="flex flex-row text-lg font-normal text-gray-600">
                            ฿
                            {(stage.goalFunding / (ProjectInfo?.totalQuantity || 1))
                                .toFixed(0)
                                .toLocaleString()}
                        </h3>
                    </div>
                </div>
                <div className="flex w-full flex-col pt-[1vh]">
                    <div
                        className="ql-editor preview-content !p-0 text-sm"
                        dangerouslySetInnerHTML={{
                            __html: stage.detail || "",
                        }}
                    />
                </div>
                <div className="flex flex-wrap  justify-between gap-y-[2vh] pt-[1vh]">
                        <span className="flex flex-col w-1/2">
                            <p className="text-lg font-bold text-gray-700">
                                Current Funding
                            </p>
                            <p className="text-base pl-[1vw] text-gray-600">{(stage.currentFunding).toLocaleString()} THB</p>
                        </span>
                        <span className="flex flex-col w-1/2">
                            <p className="text-lg font-bold text-gray-700">
                                Goal Funding
                            </p>
                            <p className="text-base pl-[1vw] text-gray-600">{stage.goalFunding.toFixed(0).toLocaleString()} </p>
                        </span>
                        <span className="flex flex-col w-1/2">
                            <p className="text-lg font-bold text-gray-700">
                                Backers:
                            </p>
                            <p className="text-base pl-[1vw] text-gray-600">{stage.totalSupporter}</p>
                        </span>
                        <span className="flex flex-col w-1/2">
                            <p className="text-lg font-bold text-gray-700">
                                Ownership
                            </p>    
                            <p className="text-base  pl-[1vw] text-gray-600">{(formatOwnerShip(stage.goalFunding,(ProjectInfo.totalQuantity ?? 0) * (ProjectInfo.costPerQuantity ?? 0))).toFixed()} % </p>
                        </span>
                </div>
                <div className="my-[1.5vh] flex w-full flex-row items-center justify-between gap-y-[1vh]">
                    <p className="text-lg font-bold text-gray-700">Stage</p>
                    <p className="text-base text-gray-600">{stage.name}</p>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-y-[1vh]">
                    <p className="text-lg font-bold text-gray-700">Estimated Date</p>
                    <p className="text-base text-gray-600">
                        {formateEstimatedDate(stage.expireDate)}
                    </p>
                </div>
                <div className="flex items-center justify-center w-full">
                    <button
                        onClick={async ()=>{
                            if (!user) {
                                router.push("/sign-in");
                                return;
                            }
                            const payload : CheckoutPayload = {
                                projectId : ProjectInfo.projectId ?? "",
                                fundingCost : Number((stage.goalFunding / (ProjectInfo?.totalQuantity || 1)).toFixed(2)),
                                paymentMethod : StripePaymentMethod.Card, 
                                stageId : stage.stageId,
                                stageName : ProjectInfo.name ?? "", 
                                transactionType : TransactionType.FUNDING
                            }
                            const response = await checkout(payload)
                            if (response.status === 201 ){
                                router.push(response.redirectUrl)
                            }
                        }}
                        disabled={stage.status !== StageStatus.CURRENT ? true : false}
                        className={`w-full py-[1.5vh] rounded-xl shadow-md hover:shadow-lg
                            transition-all duration-700
                            ${stage.status !== StageStatus.CURRENT ? 'cursor-not-allowed bg-orange-200 text-gray-500': 'text-gray-600 bg-orange-300 cursor-pointer hover:bg-orange-400 hover:scale-[1.02]'}
                        `}
                    >
                        <p className=" text-base font-bold">{stage.status !== StageStatus.CURRENT ? "UNAVALIABLE" : "SUPPORT"}</p>
                    </button>
                </div>                
            </div>
        </li>
    );
}
