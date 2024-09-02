"use client";

import { useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";

type Props = {
    projectId: string;
  };

export default function FormPayment({projectId}: Props) {
    const [form] = Form.useForm();

    useEffect(() => {
        // Load form data from sessionStorage when component mounts
        const storedValues = sessionStorage.getItem('formPaymentValues');
        if (storedValues) {
            const parsedValues = JSON.parse(storedValues);
            
            // Convert date strings back to moment objects
            if (parsedValues.startingDate) {
                parsedValues.startingDate = dayjs(parsedValues.startingDate);
            }
    
            form.setFieldsValue(parsedValues);
        }
    }, [form]);

    const onFinish = (values: any) => {
        console.log('Form values:', values);
        // Optionally, clear sessionStorage if the form is submitted
        sessionStorage.removeItem('formValues');
    };

    const handleFormChange = (changedValues: any) => {
        // Save form data to sessionStorage on form change
        const currentValues = form.getFieldsValue();
        currentValues.bankAccountLocation = "Thailand";
        sessionStorage.setItem('formPaymentValues', JSON.stringify(currentValues));
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={handleFormChange}
            className="w-full"
        >
            <h1>Bank account location</h1>
            <Form.Item name="bankAccountLocation">
                <Select defaultValue="Thailand" disabled />
            </Form.Item>
            <Title level={3}>Bank information</Title>
            <Form.Item name="bankName" label="Select bank name" rules={[{ required: true, message: 'Please input your bank name' }]}>
                <Select>
                    <Select.Option value="SCB">SCB</Select.Option>
                    <Select.Option value="KBANK">KBANK</Select.Option>
                    <Select.Option value="BANGKOK">Bangkok</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="accountHolderName" label="Account holder name" rules={[{ required: true, message: 'Please input your Account holder name' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="accountNumber" label="Account Number" rules={[{ required: true, message: 'Please input your Account number' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
}
