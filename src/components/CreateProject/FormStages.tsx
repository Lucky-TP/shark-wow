"use client";
import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Typography, message, Input, DatePicker } from "antd";
import { useRouter } from "next/navigation";
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import { editProjectById } from "src/services/apiService/projects/editProjectById";
import { ProjectModel, Stage } from "src/interfaces/models/project";
import { StageId, StageStatus } from "src/interfaces/models/enums";
import QuillEditor from "../global/QuillEditor"; // Adjust the path if necessary
import {
    dayjsToString,
    stringToDayjs,
} from "src/utils/date/dateConversion";
import LoadingPage from "../global/LoadingPage";

const { Title } = Typography;
const { RangePicker } = DatePicker;

type Props = {
    projectId: string;
};

export default function FormStages({ projectId }: Props) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [conceptDetail, setConceptDetail] = useState<string>("");
    const [prototypeDetail, setPrototypeDetail] = useState<string>("");
    const [productionDetail, setProductionDetail] = useState<string>("");
    const [totalValue, setTotalValue] = useState<number>(0);
    const [stages, setStages] = useState<Stage[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                const response = await getProjectById(projectId);
                if (response.data) {
                    setStages(response.data.stages);
                    const retrivedConceptStage = response.data.stages[StageId.CONCEPT];
                    const retrivedPrototypeStage = response.data.stages[StageId.PROTOTYPE];
                    const retrivedProductionStage = response.data.stages[StageId.PRODUCTION];
                    const { totalQuantity, costPerQuantity } = response.data;
                    const combinedValue = totalQuantity * costPerQuantity;

                    setTotalValue(combinedValue);
                    form.setFieldsValue({
                        packages: response.data.totalQuantity,
                        cpp: response.data.costPerQuantity,
                        conceptOwnership: (retrivedConceptStage.goalFunding * 100) / combinedValue,
                        prototypeOwnership:
                            (retrivedPrototypeStage.goalFunding * 100) / combinedValue,
                        productionOwnership:
                            (retrivedProductionStage.goalFunding * 100) / combinedValue,

                        conceptStartDate: stringToDayjs(retrivedConceptStage.startDate),
                        conceptExpireDate: stringToDayjs(retrivedConceptStage.expireDate),
                        prototypeStartDate: stringToDayjs(retrivedPrototypeStage.startDate),
                        prototypeExpireDate: stringToDayjs(retrivedPrototypeStage.expireDate),
                        productionStartDate: stringToDayjs(retrivedProductionStage.startDate),
                        productionExpireDate: stringToDayjs(retrivedProductionStage.expireDate),
                    });
                    setConceptDetail(retrivedConceptStage.detail);
                    setPrototypeDetail(retrivedPrototypeStage.detail);
                    setProductionDetail(retrivedProductionStage.detail);
                }
            } catch (error: unknown) {
                console.error("Failed to fetch project data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [form, projectId]);

    const handleValueChange = () => {
        const packages = form.getFieldValue("packages") || 0;
        const cpp = form.getFieldValue("cpp") || 0;
        const calculatedTotalValue = packages * cpp;
        setTotalValue(calculatedTotalValue);
    };

    useEffect(() => {
        const packages = form.getFieldValue("packages");
        const cpp = form.getFieldValue("cpp");
        if (packages !== undefined && cpp !== undefined) {
            handleValueChange();
        }
    }, [form.getFieldValue("packages"), form.getFieldValue("cpp")]);

    const calculateMaxOwnership = () => {
        const conceptOwnership = form.getFieldValue("conceptOwnership") || 0;
        const prototypeOwnership = form.getFieldValue("prototypeOwnership") || 0;
        const productionOwnership = form.getFieldValue("productionOwnership") || 0;
        const totalOwnership = conceptOwnership + prototypeOwnership + productionOwnership;

        return {
            conceptMax: Math.max(0, 100 - (prototypeOwnership + productionOwnership)),
            prototypeMax: Math.max(0, 100 - (conceptOwnership + productionOwnership)),
            productionMax: Math.max(0, 100 - (conceptOwnership + prototypeOwnership)),
        };
    };

    const handleOwnershipChange = (changedField: string, value: number | null) => {
        const { conceptMax, prototypeMax, productionMax } = calculateMaxOwnership();

        if (value === null) {
            return;
        }

        if (changedField === "conceptOwnership") {
            form.setFieldsValue({
                conceptOwnership: Math.min(value, conceptMax),
            });
        } else if (changedField === "prototypeOwnership") {
            form.setFieldsValue({
                prototypeOwnership: Math.min(value, prototypeMax),
            });
        } else if (changedField === "productionOwnership") {
            form.setFieldsValue({
                productionOwnership: Math.min(value, productionMax),
            });
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        if (!stages) {
            return;
        }

        const updatedStages: Stage[] = [
            {
                stageId: StageId.CONCEPT,
                name: "Concept",
                startDate: values.conceptDates
                    ? dayjsToString(values.conceptDates[0])
                    : stages[StageId.CONCEPT].startDate,
                expireDate: values.conceptDates
                    ? dayjsToString(values.conceptDates[1])
                    : stages[StageId.CONCEPT].expireDate,
                status: StageStatus.CURRENT,
                detail: conceptDetail,
                imageUrl: "",
                fundingCost: 0,
                currentFunding: 0,
                goalFunding: (values.conceptOwnership / 100) * totalValue,
                totalSupporter: 0,
            },
            {
                stageId: StageId.PROTOTYPE,
                name: "Prototype",
                startDate: values.prototypeDates
                    ? dayjsToString(values.prototypeDates[0])
                    : stages[StageId.PROTOTYPE].startDate,
                expireDate: values.prototypeDates
                    ? dayjsToString(values.prototypeDates[1])
                    : stages[StageId.PROTOTYPE].expireDate,
                status: StageStatus.INCOMING,
                detail: prototypeDetail,
                imageUrl: "",
                fundingCost: 0,
                currentFunding: 0,
                goalFunding: (values.prototypeOwnership / 100) * totalValue,
                totalSupporter: 0,
            },
            {
                stageId: StageId.PRODUCTION,
                name: "Production",
                startDate: values.productionDates
                    ? dayjsToString(values.productionDates[0])
                    : stages[StageId.PRODUCTION].startDate,
                expireDate: values.productionDates
                    ? dayjsToString(values.productionDates[1])
                    : stages[StageId.PRODUCTION].expireDate,
                status: StageStatus.INCOMING,
                detail: productionDetail,
                imageUrl: "",
                fundingCost: 0,
                currentFunding: 0,
                goalFunding: (values.productionOwnership / 100) * totalValue,
                totalSupporter: 0,
            },
        ];
        const updatedProjectData: Partial<ProjectModel> = {
            totalQuantity: values.packages,
            costPerQuantity: values.cpp,
            stages: updatedStages,
        };

        if (conceptDetail && prototypeDetail && productionDetail) {
            try {
                await editProjectById(projectId, updatedProjectData);
                message.success("Project updated successfully!");
                router.push(`/create-project/${projectId}/payment`);
            } catch (error) {
                message.error("Project update failed!");
            }
        } else {
            message.error("Please input project detail!");
        }
        setLoading(false);
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} className="w-full">
            <Title level={2}>Form Stages</Title>
            <Form.Item name="packages" label="How many packages do you want to sell for funding">
                <InputNumber min={0} onChange={handleValueChange} />
            </Form.Item>
            <Form.Item name="cpp" label="Cost per 1 package">
                <InputNumber min={0} onChange={handleValueChange} />
            </Form.Item>
            <Title level={4}>Total Funding: {totalValue.toLocaleString()} baht</Title>
            <Title level={3}>Stage 1: Concept</Title>
            <Form.Item name="conceptDates" label="Start and End Dates">
                <RangePicker
                    name="conceptDates"
                    format="DD-MM-YYYY"
                    defaultValue={[
                        stages ? stringToDayjs(stages[StageId.CONCEPT].startDate) : null,
                        stages ? stringToDayjs(stages[StageId.CONCEPT].expireDate) : null,
                    ]}
                />
            </Form.Item>
            <Form.Item name="conceptOwnership" label="Ownership (%)">
                <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) => handleOwnershipChange("conceptOwnership", value)}
                />
            </Form.Item>
            <QuillEditor value={conceptDetail} onChange={setConceptDetail} projectId={projectId} />

            <Title level={3} className="mt-12">
                Stage 2: Prototype
            </Title>
            <Form.Item name="prototypeDates" label="Start and End Dates">
                <RangePicker
                    name="prototypeDates"
                    format="DD-MM-YYYY"
                    defaultValue={[
                        stages ? stringToDayjs(stages[StageId.PROTOTYPE].startDate) : null,
                        stages ? stringToDayjs(stages[StageId.PROTOTYPE].expireDate) : null,
                    ]}
                />
            </Form.Item>
            <Form.Item name="prototypeOwnership" label="Ownership (%)">
                <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) => handleOwnershipChange("prototypeOwnership", value)}
                />
            </Form.Item>
            <QuillEditor
                value={prototypeDetail}
                onChange={setPrototypeDetail}
                projectId={projectId}
            />

            <Title level={3} className="mt-12">
                Stage 3: Production
            </Title>
            <Form.Item name="productionDates" label="Start and End Dates">
                <RangePicker
                    name="productionDates"
                    format="DD-MM-YYYY"
                    defaultValue={[
                        stages ? stringToDayjs(stages[StageId.PRODUCTION].startDate) : null,
                        stages ? stringToDayjs(stages[StageId.PRODUCTION].expireDate) : null,
                    ]}
                />
            </Form.Item>
            <Form.Item name="productionOwnership" label="Ownership (%)">
                <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) => handleOwnershipChange("productionOwnership", value)}
                />
            </Form.Item>
            <QuillEditor
                value={productionDetail}
                onChange={setProductionDetail}
                projectId={projectId}
            />

            <Form.Item>
                <Button
                    className="mt-10"
                    loading={loading}
                    disabled={loading}
                    type="primary"
                    htmlType="submit"
                >
                    Save and Continue
                </Button>
            </Form.Item>
        </Form>
    );
}
