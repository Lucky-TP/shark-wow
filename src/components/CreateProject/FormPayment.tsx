"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
type Props = {}

export default function FormPayment({}: Props) {
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
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={handleFormChange}
            >
                <h1>Bank account location</h1>
                <Form.Item name="bankAccountLocation">
                    <Select defaultValue="Thailand" disabled />
                </Form.Item>
                <Title level={3}>Bank information</Title>
                <Form.Item name="bankName" label="Select bank name" rules={[{ required: true, message: 'Please input your bank name' }]}>
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: 'KBank',
                                label: 'KBank',
                            },
                            {
                                value: 'SCB',
                                label: 'SCB',
                            },
                            {
                                value: 'Bangkok',
                                label: 'Bangkok',
                            },
                        ]}
                    />
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
        </>
    );
}
