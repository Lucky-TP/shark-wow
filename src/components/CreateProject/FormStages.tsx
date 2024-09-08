"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    InputNumber,
    Button,
    Typography,
    message,
    Input,
    DatePicker,
} from "antd";
import { useRouter } from "next/navigation";
import { getProjectById } from "src/services/apiService/projects/getProjectById";
import { editProjectById } from "src/services/apiService/projects/editProjectById";
import { ProjectModel, Stage } from "src/interfaces/models/project";
import { StageId, StageStatus } from "src/interfaces/models/enums";
import QuillEditor from "../global/QuillEditor"; // Adjust the path if necessary
import dayjs from "dayjs";
import { dateToString, stringToDate } from "src/utils/date/dateConversion";

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
    const [conceptStartDate, setConceptStartDate] = useState<Date | null>(
        new Date()
    );
    const [conceptExpireDate, setConceptExpireDate] = useState<Date | null>(
        new Date()
    );
    const [prototypeStartDate, setPrototypeStartDate] = useState<Date | null>(
        new Date()
    );
    const [prototypeExpireDate, setPrototypeExpireDate] = useState<Date | null>(
        new Date()
    );
    const [productionStartDate, setProductionStartDate] = useState<Date | null>(
        new Date()
    );
    const [productionExpireDate, setProductionExpireDate] =
        useState<Date | null>(new Date());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await getProjectById(projectId);
                if (response.data) {
                    const conceptStage = response.data.stages[StageId.CONCEPT];
                    const prototypeStage =
                        response.data.stages[StageId.PROTOTYPE];
                    const productionStage =
                        response.data.stages[StageId.PRODUCTION];
                    setConceptStartDate(stringToDate(conceptStage?.startDate!));
                    setConceptExpireDate(
                        stringToDate(conceptStage?.expireDate!)
                    );
                    setPrototypeStartDate(
                        stringToDate(prototypeStage?.startDate!)
                    );
                    setPrototypeExpireDate(
                        stringToDate(prototypeStage?.expireDate!)
                    );
                    setProductionStartDate(
                        stringToDate(productionStage?.startDate!)
                    );
                    setProductionExpireDate(
                        stringToDate(productionStage?.expireDate!)
                    );

                    form.setFieldsValue({
                        packages: response.data.totalQuantity || undefined,
                        cpp: response.data.costPerQuantity || undefined,
                        conceptOwnership:
                            (conceptStage.goalFunding * 100) /
                                (response.data.totalQuantity *
                                    response.data.costPerQuantity) || undefined,
                        prototypeOwnership:
                            (prototypeStage.goalFunding * 100) /
                                (response.data.totalQuantity *
                                    response.data.costPerQuantity) || undefined,
                        productionOwnership:
                            (productionStage.goalFunding * 100) /
                                (response.data.totalQuantity *
                                    response.data.costPerQuantity) || undefined,
                        // conceptStartDate: timestampToDate(conceptStage?.startDate!),
                        // conceptExpireDate: timestampToDate(conceptStage?.expireDate!),
                        // prototypeStartDate: timestampToDate(prototypeStage?.startDate!),
                        // prototypeExpireDate: timestampToDate(prototypeStage?.expireDate!),
                        // productionStartDate: timestampToDate(productionStage?.startDate!),
                        // productionExpireDate: timestampToDate(productionStage?.expireDate!),
                    });
                    setConceptDetail(conceptStage?.detail ?? "");
                    setPrototypeDetail(prototypeStage?.detail ?? "");
                    setProductionDetail(productionStage?.detail ?? "");
                }
            } catch (error) {
                console.error("Failed to fetch project data", error);
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
        const prototypeOwnership =
            form.getFieldValue("prototypeOwnership") || 0;
        const productionOwnership =
            form.getFieldValue("productionOwnership") || 0;
        const totalOwnership =
            conceptOwnership + prototypeOwnership + productionOwnership;

        return {
            conceptMax: Math.max(
                0,
                100 - (prototypeOwnership + productionOwnership)
            ),
            prototypeMax: Math.max(
                0,
                100 - (conceptOwnership + productionOwnership)
            ),
            productionMax: Math.max(
                0,
                100 - (conceptOwnership + prototypeOwnership)
            ),
        };
    };

    const handleOwnershipChange = (
        changedField: string,
        value: number | null
    ) => {
        const { conceptMax, prototypeMax, productionMax } =
            calculateMaxOwnership();

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
        const updatedStages: Stage[] = [
            {
                stageId: StageId.CONCEPT,
                name: "Concept",
                startDate: dateToString(conceptStartDate!),
                expireDate: dateToString(conceptExpireDate!),
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
                startDate: dateToString(prototypeStartDate!),
                expireDate: dateToString(prototypeExpireDate!),
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
                startDate: dateToString(productionStartDate!),
                expireDate: dateToString(productionExpireDate!),
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

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
        >
            <Title level={2}>Form Stages</Title>
            <Form.Item
                name="packages"
                label="How many packages do you want to sell for funding"
            >
                <InputNumber min={0} onChange={handleValueChange} />
            </Form.Item>
            <Form.Item name="cpp" label="Cost per 1 package">
                <InputNumber min={0} onChange={handleValueChange} />
            </Form.Item>
            <Title level={4}>
                Total Funding: {totalValue.toLocaleString()} baht
            </Title>
            <Title level={3}>Stage 1: Concept</Title>
            <Form.Item name="conceptDates" label="Start and End Dates">
                <RangePicker
                    name="conceptDates"
                    format="DD-MM-YYYY"
                    defaultValue={[
                        dayjs(
                            dayjs(conceptStartDate).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                        ),
                        dayjs(
                            dayjs(conceptExpireDate).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                        ),
                    ]}
                />
            </Form.Item>
            <Form.Item name="conceptOwnership" label="Ownership (%)">
                <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) =>
                        handleOwnershipChange("conceptOwnership", value)
                    }
                />
            </Form.Item>
            <QuillEditor
                value={conceptDetail}
                onChange={setConceptDetail}
                projectId={projectId}
            />

            <Title level={3} className="mt-12">
                Stage 2: Prototype
            </Title>
            <Form.Item name="prototypeDates" label="Start and End Dates">
                <RangePicker
                    name="prototypeDates"
                    format="DD-MM-YYYY"
                    defaultValue={[
                        dayjs(
                            dayjs(prototypeStartDate).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                        ),
                        dayjs(
                            dayjs(prototypeExpireDate).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                        ),
                    ]}
                />
            </Form.Item>
            <Form.Item name="prototypeOwnership" label="Ownership (%)">
                <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) =>
                        handleOwnershipChange("prototypeOwnership", value)
                    }
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
                        dayjs(
                            dayjs(productionStartDate).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                        ),
                        dayjs(
                            dayjs(productionExpireDate).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                        ),
                    ]}
                />
            </Form.Item>
            <Form.Item name="productionOwnership" label="Ownership (%)">
                <InputNumber
                    min={0}
                    max={100}
                    onChange={(value) =>
                        handleOwnershipChange("productionOwnership", value)
                    }
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
