"use client";

import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Typography } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { getProjectById } from 'src/services/apiService/projects/getProjectById';
import { editProjectById } from 'src/services/apiService/projects/editProjectById';
import { ProjectModel, Stage } from 'src/interfaces/models/project';
import { StageId } from 'src/interfaces/models/enums';

const { Title } = Typography;

export default function FormStages() {
  const router = useRouter();
  const pathName = usePathname();
  const projectIdMatch = pathName.match(/\/create-project\/([a-zA-Z0-9]+)/);
  const projectId = projectIdMatch ? projectIdMatch[1] : "";
  const [form] = Form.useForm();
  const [projectData, setProjectData] = useState<ProjectModel | undefined>();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await getProjectById(projectId);
        setProjectData(response.data);
        if (response.data) {
          const conceptStage = response.data.stages.find(stage => stage.stageId === StageId.CONCEPT);
          const prototypeStage = response.data.stages.find(stage => stage.stageId === StageId.PROTOTYPE);
          const productionStage = response.data.stages.find(stage => stage.stageId === StageId.PRODUCTION);

          form.setFieldsValue({
            conceptDays: conceptStage?.startDate || undefined,
            conceptOwnership: conceptStage?.status || undefined,
            prototypeDays: prototypeStage?.startDate || undefined,
            prototypeOwnership: prototypeStage?.status || undefined,
            productionDays: productionStage?.startDate || undefined,
            productionOwnership: productionStage?.status || undefined,
          });
        }
      } catch (error) {
        console.error('Failed to fetch project data', error);
      }
    };

    fetchProjectData();
  }, [form, projectId]);

  const handleSaveAndContinue = async (values: any) => {
    const updatedStages: Stage[] = [
      {
        stageId: StageId.CONCEPT,
        name: 'Concept',
        startDate: values.conceptDays,
        status: values.conceptOwnership || 2, // Default to 2 if not provided
        detail: '', // Add other details as necessary
        imageUrl: '',
        minimumFunding: 0,
        currentFunding: 0,
        goalFunding: 0,
        totalSupporter: 0,
      },
      {
        stageId: StageId.PROTOTYPE,
        name: 'Prototype',
        startDate: values.prototypeDays,
        status: values.prototypeOwnership || 2, // Default to 2 if not provided
        detail: '', // Add other details as necessary
        imageUrl: '',
        minimumFunding: 0,
        currentFunding: 0,
        goalFunding: 0,
        totalSupporter: 0,
      },
      {
        stageId: StageId.PRODUCTION,
        name: 'Production',
        startDate: values.productionDays,
        status: values.productionOwnership || 2, // Default to 2 if not provided
        detail: '', // Add other details as necessary
        imageUrl: '',
        minimumFunding: 0,
        currentFunding: 0,
        goalFunding: 0,
        totalSupporter: 0,
      },
    ];

    const updatedProjectData: Partial<ProjectModel> = {
      stages: updatedStages,
    };

    try {
      await editProjectById(projectId, updatedProjectData);
      router.push(`/create-project/${projectId}/payment`);
    } catch (error) {
      console.error('Failed to update project', error);
    }
  };

  return (
    <div>
      <Title level={2}>Form Stages</Title>
      <Form form={form} layout="vertical" onFinish={handleSaveAndContinue}>
        <Form.Item name="packages" label="Q1: How many packages do you want to sell for funding">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="cpp" label="Q2: Cost per 1 package">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Title level={3}>Stage 1: Concept</Title>
        <Form.Item name="conceptDays" label="Time to use (days)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="conceptOwnership" label="Ownership (%)">
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
          {/* Add additional calculations or display based on the conceptOwnership */}
        </Form.Item>
        <Form.Item label="Discount for 1 product">
          {/* Replace with actual calculation based on conceptOwnership */}
        </Form.Item>
        <Form.Item name="conceptDetails" label="Stage Details">
          {/* Optionally, add a text editor component if needed */}
        </Form.Item>

        <Title level={3}>Stage 2: Prototype</Title>
        <Form.Item name="prototypeDays" label="Time to use (days)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="prototypeOwnership" label="Ownership (%)">
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
          {/* Add additional calculations or display based on the prototypeOwnership */}
        </Form.Item>
        <Form.Item label="Fund for this stage">
          {/* Replace with actual calculation based on prototypeOwnership */}
        </Form.Item>
        <Form.Item name="prototypeDetails" label="Stage Details">
          {/* Optionally, add a text editor component if needed */}
        </Form.Item>

        <Title level={3}>Stage 3: Production</Title>
        <Form.Item name="productionDays" label="Time to use (days)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="productionOwnership" label="Ownership (%)">
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
          {/* Add additional calculations or display based on the productionOwnership */}
        </Form.Item>
        <Form.Item label="Fund for this stage">
          {/* Replace with actual calculation based on productionOwnership */}
        </Form.Item>
        <Form.Item name="productionDetails" label="Stage Details">
          {/* Optionally, add a text editor component if needed */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
