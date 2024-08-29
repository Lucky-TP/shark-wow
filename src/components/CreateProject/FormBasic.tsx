"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { upload } from "src/services/apiService/files/upload"; // Replace with the correct path to your upload function
import { FileUploadPayload } from "src/interfaces/payload/filePayload";
import { FileTypeKeys } from "src/constants/payloadKeys/file"; // Make sure you import FileTypeKeys

type Props = {};

export default function FormBasic({}: Props) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Load form data from sessionStorage when the component mounts
    const storedValues = sessionStorage.getItem("formBasicValues");
    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);

      // Convert date strings back to dayjs objects
      if (parsedValues.startingDate) {
        parsedValues.startingDate = dayjs(parsedValues.startingDate);
      }

      form.setFieldsValue(parsedValues);
    }
  }, [form]);

  const onFinish = async (values: any) => {
    console.log("Form values:", values);

    if (file) {
      try {
        const payload: FileUploadPayload = {
          file,
          fileType: "image" as FileTypeKeys, // Ensure that the type matches FileTypeKeys
          projectId: "1", // Replace with the actual project ID
        };

        const response = await upload(payload);
        if (response && response.length > 0) {
          // Safely handle the URL assignment
          const uploadedImageUrl = response[0]?.url ?? null; // Use null as fallback if undefined
          setImageUrl(uploadedImageUrl);
          message.success("Image uploaded successfully!");
        }
      } catch (error) {
        message.error("Image upload failed!");
        console.error(error);
      }
    }

    // Optionally, clear sessionStorage if the form is submitted
    sessionStorage.removeItem("formBasicValues");
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setFile(info.file.originFileObj); // Set the file to state for upload
      setImageUrl(URL.createObjectURL(info.file.originFileObj)); // Generate preview URL
    } else if (info.file.status === "removed") {
      setFile(null);
      setImageUrl(null);
    }
  };

  const handleFormChange = (changedValues: any) => {
    // Save form data to sessionStorage on form change
    const currentValues = form.getFieldsValue();
    sessionStorage.setItem("formBasicValues", JSON.stringify(currentValues));
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
        <p>Summarize your details for a good impression</p>
        <Form.Item
          name="title"
          label="Project Title"
          rules={[{ required: true, message: "Please input your project title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Project Description"
          rules={[{ required: true, message: "Please input your project description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Project Image">
          <Upload
            name="image"
            listType="picture"
            showUploadList={false}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Project"
              style={{ marginTop: "10px", maxWidth: "100%" }}
            />
          )}
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message:
            "Please input the location!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select>
            <Select.Option value="technology">Technology</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="art">Art</Select.Option>
            <Select.Option value="health">Health</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="startingDate"
          label="Starting Date"
          rules={[{ required: true, message: "Please select the starting date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Project Duration (in days)"
          rules={[{ required: true, message: "Please input the project duration!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
