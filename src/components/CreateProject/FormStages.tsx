"use client"
import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Typography, Input, DatePicker } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const { Title } = Typography;

export default function FormStages() {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [conceptDays, setConceptDays] = useState<number>(0);
  const [conceptOwnership, setConceptOwnership] = useState<number>(0);
  const [prototypeDays, setPrototypeDays] = useState<number>(0);
  const [prototypeOwnership, setPrototypeOwnership] = useState<number>(0);
  const [productionDays, setProductionDays] = useState<number>(0);
  const [productionOwnership, setProductionOwnership] = useState<number>(0);

  const [form] = Form.useForm();

  const totalFunding = quantity * price;
  const router = useRouter();


  useEffect(() => {
    // Load form data from sessionStorage when component mounts
    const storedValues = sessionStorage.getItem('formStagesValues');
    if (storedValues) {
        const parsedValues = JSON.parse(storedValues);
        
        // Convert date strings back to moment objects
        if (parsedValues.startingDate) {
            parsedValues.startingDate = dayjs(parsedValues.startingDate);
        }

        form.setFieldsValue(parsedValues);
    }
  }, [form]);

  const handleFormChange = (changedValues: any) => {
    // Save form data to sessionStorage on form change
    const currentValues = form.getFieldsValue();
    sessionStorage.setItem('formStagesValues', JSON.stringify(currentValues));
  };

  const handleSaveAndContinue = () => {
    router.push('/create-project/payment');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: 'auto' }}>
      <Title level={2}>Form Stages</Title>
      <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
        <Form.Item name="packages" label="Q1: How many packages do you want to sell for funding">
            <InputNumber
                min={0}
                value={quantity}
                onChange={(value) => setQuantity(value ?? 0)} // Handle null values
                style={{ width: 'calc(100% - 150px)' }}
            />
            {/* <Input style={{ width: '150px' }} value="packages" readOnly /> */}
        </Form.Item>

        <Form.Item name="cpp" label="Q2: Cost per 1 package">
            <InputNumber
              min={0}
              value={price}
              onChange={(value) => setPrice(value ?? 0)} // Handle null values
              style={{ width: 'calc(100% - 150px)' }}
            />
            {/* <Input style={{ width: '150px' }} value="baht per 1 package" readOnly /> */}
        </Form.Item>

        <Typography.Paragraph>
          Total funding: {totalFunding} baht
        </Typography.Paragraph>

        <Title level={3}>Stage 1 : Concept</Title>
        <Form.Item name="TimeToUse" label="Time to use (days)">
          <InputNumber
            min={0}
            value={conceptDays}
            onChange={(value) => setConceptDays(value ?? 0)} // Handle null values
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Ownership (%)">
          <InputNumber
            min={0}
            max={100}
            value={conceptOwnership}
            onChange={(value) => setConceptOwnership(value ?? 0)} // Handle null values
            style={{ width: '100%' }}
          />
          <Typography.Paragraph>
            ({totalFunding * (conceptOwnership / 100)} baht)
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Fund for this stage">
          <Typography.Paragraph>
            {conceptOwnership * price / 100} baht
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Stage Details">
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              // Handle CKEditor data change if needed
            }}
          />
        </Form.Item>

        <Title level={3}>Stage 2 : Prototype</Title>
        <Form.Item label="Time to use (days)">
          <InputNumber
            min={0}
            value={prototypeDays}
            onChange={(value) => setPrototypeDays(value ?? 0)} // Handle null values
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Ownership (%)">
          <InputNumber
            min={0}
            max={100}
            value={prototypeOwnership}
            onChange={(value) => setPrototypeOwnership(value ?? 0)} // Handle null values
            style={{ width: '100%' }}
          />
          <Typography.Paragraph>
            ({totalFunding * (prototypeOwnership / 100)} baht)
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Fund for this stage">
          <Typography.Paragraph>
            {prototypeOwnership * price / 100} baht
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Stage Details">
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              // Handle CKEditor data change if needed
            }}
          />
        </Form.Item>

        <Title level={3}>Stage 3 : Production</Title>
        <Form.Item label="Time to use (days)">
          <InputNumber
            min={0}
            value={productionDays}
            onChange={(value) => setProductionDays(value ?? 0)} // Handle null values
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Ownership (%)">
          <InputNumber
            min={0}
            max={100}
            value={productionOwnership}
            onChange={(value) => setProductionOwnership(value ?? 0)} // Handle null values
            style={{ width: '100%' }}
          />
          <Typography.Paragraph>
            ({totalFunding * (productionOwnership / 100)} baht)
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Fund for this stage">
          <Typography.Paragraph>
            {productionOwnership * price / 100} baht
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item label="Stage Details">
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              // Handle CKEditor data change if needed
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSaveAndContinue}>
            Save and Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
