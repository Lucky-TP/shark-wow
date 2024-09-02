"use client";

import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Typography, message, Input, DatePicker } from 'antd';
import { useRouter } from 'next/navigation';
import { getProjectById } from 'src/services/apiService/projects/getProjectById';
import { editProjectById } from 'src/services/apiService/projects/editProjectById';
import { ProjectModel, Stage } from 'src/interfaces/models/project';
import { StageId } from 'src/interfaces/models/enums';
import QuillEditor from '../global/QuillEditor'; // Adjust the path if necessary
import dayjs from 'dayjs';
import { dateToTimestamp, timestampToDate } from 'src/utils/date/clientDateConversions';
import { Timestamp } from 'firebase/firestore';

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

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await getProjectById(projectId);
        if (response.data) {
          const conceptStage = response.data.stages.find(stage => stage.stageId === StageId.CONCEPT);
          const prototypeStage = response.data.stages.find(stage => stage.stageId === StageId.PROTOTYPE);
          const productionStage = response.data.stages.find(stage => stage.stageId === StageId.PRODUCTION);

          form.setFieldsValue({
            packages: response.data.totalQuantity || undefined,
            cpp: response.data.costPerQuantity || undefined,
            // conceptDates: conceptStage && conceptStage.startDate && conceptStage.expireDate
            //   ? [timestampToDate(conceptStage.startDate), timestampToDate(conceptStage.expireDate)]
            //   : undefined,
            conceptOwnership: (conceptStage?.goalFunding? conceptStage?.goalFunding*100/totalValue: 0) || undefined,
            // prototypeDates: prototypeStage && prototypeStage.startDate && prototypeStage.expireDate
            //   ? [timestampToDate(prototypeStage.startDate), timestampToDate(prototypeStage.expireDate)]
            //   : undefined,
            prototypeOwnership: (prototypeStage?.goalFunding? prototypeStage?.goalFunding*100/totalValue: 0) || undefined,
            // productionDates: productionStage && productionStage.startDate && productionStage.expireDate
            //   ? [timestampToDate(productionStage.startDate), timestampToDate(productionStage.expireDate)]
            //   : undefined,
            productionOwnership: (prototypeStage?.goalFunding? prototypeStage?.goalFunding*100/totalValue : 0) || undefined,
          });
          setConceptDetail(conceptStage?.detail ?? "");
          setPrototypeDetail(prototypeStage?.detail ?? "");
          setProductionDetail(productionStage?.detail ?? "");
        }
      } catch (error) {
        console.error('Failed to fetch project data', error);
      }
    };

    fetchProjectData();
  }, [form, projectId]);

  const handleValueChange = () => {
    const packages = form.getFieldValue('packages') || 0;
    const cpp = form.getFieldValue('cpp') || 0;
    const calculatedTotalValue = packages * cpp;
    setTotalValue(calculatedTotalValue);
  };

  useEffect(() => {
    const packages = form.getFieldValue('packages');
    const cpp = form.getFieldValue('cpp');
    if (packages !== undefined && cpp !== undefined) {
      handleValueChange();
    }
  }, [form.getFieldValue('packages'), form.getFieldValue('cpp')]);

  const calculateMaxOwnership = () => {
    const conceptOwnership = form.getFieldValue('conceptOwnership') || 0;
    const prototypeOwnership = form.getFieldValue('prototypeOwnership') || 0;
    const productionOwnership = form.getFieldValue('productionOwnership') || 0;
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
  
    if (changedField === 'conceptOwnership') {
      form.setFieldsValue({ 
        conceptOwnership: Math.min(value, conceptMax) 
      });
    } else if (changedField === 'prototypeOwnership') {
      form.setFieldsValue({ 
        prototypeOwnership: Math.min(value, prototypeMax) 
      });
    } else if (changedField === 'productionOwnership') {
      form.setFieldsValue({ 
        productionOwnership: Math.min(value, productionMax) 
      });
    }
  };
  

  const onFinish = async (values: any) => {
    const updatedStages: Stage[] = [
      {
        stageId: StageId.CONCEPT,
        name: 'Concept',
        startDate: dateToTimestamp(values.conceptDates[0].toDate()),
        expireDate: dateToTimestamp(values.conceptDates[1].toDate()),
        status: 2,
        detail: conceptDetail, // Updated to use editor content
        imageUrl: '',
        fundingCost: 0,
        currentFunding: 0,
        goalFunding: ((values.conceptOwnership/100)*totalValue),
        totalSupporter: 0,
      },
      {
        stageId: StageId.PROTOTYPE,
        name: 'Prototype',
        startDate: dateToTimestamp(values.prototypeDates[0].toDate()),
        expireDate: dateToTimestamp(values.prototypeDates[1].toDate()),
        status: 1,
        detail: prototypeDetail, // Updated to use editor content
        imageUrl: '',
        fundingCost: 0,
        currentFunding: 0,
        goalFunding: ((values.prototypeOwnership/100)*totalValue),
        totalSupporter: 0,
      },
      {
        stageId: StageId.PRODUCTION,
        name: 'Production',
        startDate: dateToTimestamp(values.productionDates[0].toDate()),
        expireDate: dateToTimestamp(values.productionDates[1].toDate()),
        status: 1,
        detail: productionDetail, // Updated to use editor content
        imageUrl: '',
        fundingCost: 0,
        currentFunding: 0,
        goalFunding: ((values.productionOwnership/100)*totalValue),
        totalSupporter: 0,
      },
    ];
    console.log(values.conceptDates[0]);
    console.log(values.conceptDates[0].toDate());
    console.log(dateToTimestamp(values.conceptDates[0].toDate()));

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
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className='w-full'>
      <Title level={2}>Form Stages</Title>
      <Form.Item name="packages" label="How many packages do you want to sell for funding">
        <InputNumber min={0} onChange={handleValueChange}/>
      </Form.Item>
      <Form.Item name="cpp" label="Cost per 1 package">
        <InputNumber min={0} onChange={handleValueChange}/>
      </Form.Item>
      <Title level={4}>Total Funding: {totalValue} baht</Title>
      <Title level={3}>Stage 1: Concept</Title>
      <Form.Item name="conceptDates" label="Start and End Dates">
        <RangePicker name="conceptDates" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="conceptOwnership" label="Ownership (%)">
        <InputNumber
          min={0} 
          max={100}
          onChange={value => handleOwnershipChange('conceptOwnership', value)}
        />
      </Form.Item>
      <Form.Item label="Discount for 1 product">
        {/* Replace with actual calculation based on conceptOwnership */}
      </Form.Item>
      <QuillEditor value={conceptDetail} onChange={setConceptDetail} projectId={projectId} />

      <Title level={3}>Stage 2: Prototype</Title>
      <Form.Item name="prototypeDates" label="Start and End Dates">
        <RangePicker name="prototypeDates" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="prototypeOwnership" label="Ownership (%)">
        <InputNumber 
          min={0} 
          max={100}
          onChange={value => handleOwnershipChange('prototypeOwnership', value)}
        />
      </Form.Item>
      <Form.Item label="Fund for this stage">
        {/* Replace with actual calculation based on prototypeOwnership */}
      </Form.Item>
      <QuillEditor value={prototypeDetail} onChange={setPrototypeDetail} projectId={projectId} />

      <Title level={3}>Stage 3: Production</Title>
      <Form.Item name="productionDates" label="Start and End Dates">
        <RangePicker name="productionDates" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="productionOwnership" label="Ownership (%)">
        <InputNumber 
          min={0} 
          max={100}
          onChange={value => handleOwnershipChange('productionOwnership', value)}
        />
      </Form.Item>
      <Form.Item label="Fund for this stage">
        {/* Replace with actual calculation based on productionOwnership */}
      </Form.Item>
      <QuillEditor value={productionDetail} onChange={setProductionDetail} projectId={projectId} />

      <Form.Item>
        <Button className="mt-10" type="primary" htmlType="submit">
          Save and Continue
        </Button>
      </Form.Item>
    </Form>
  );
}
