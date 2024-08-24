"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
type Props = {}

export default function FormBasic({}: Props) {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Load form data from sessionStorage when component mounts
        const storedValues = sessionStorage.getItem('formBasicValues');
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
        sessionStorage.removeItem('formBasicValues');
    };

    const handleImageChange = (info: any) => {
        if (info.file.status === 'done') {
            setImageUrl(URL.createObjectURL(info.file.originFileObj));
        }
    };

    const handleFormChange = (changedValues: any) => {
        // Save form data to sessionStorage on form change
        const currentValues = form.getFieldsValue();
        sessionStorage.setItem('formBasicValues', JSON.stringify(currentValues));
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={handleFormChange}
            >
                <h1>Basic Details</h1>
                <p>Summarize your details for good impression</p>
                <Form.Item name="title" label="Project Title" rules={[{ required: true, message: 'Please input your project title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Project Description" rules={[{ required: true, message: 'Please input your project description!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Project Image">
                    <Upload 
                        name="image"
                        listType="picture"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    {imageUrl && <img src={imageUrl} alt="Project" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                </Form.Item>
                <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please input the location!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
                    <Select>
                        <Select.Option value="technology">Technology</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="art">Art</Select.Option>
                        <Select.Option value="health">Health</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="startingDate" label="Starting Date" rules={[{ required: true, message: 'Please select the starting date!' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="duration" label="Project Duration (in days)" rules={[{ required: true, message: 'Please input the project duration!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
}
