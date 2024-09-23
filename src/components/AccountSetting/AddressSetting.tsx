"use client";

import React from "react";
import { Form, Input, Button, Checkbox, Select, message } from "antd"; // Import message for notifications
import axios from "axios"; // Import axios for backend integration

const { Option } = Select;

export default function AddressSetting() {
    const onFinish = async (values: any) => {
        try {
            // Replace with your backend API URL
            const response = await axios.post("/api/address", values);
            if (response.status === 200) {
                message.success("Address created successfully!");
            }
        } catch (error) {
            message.error("Failed to create address. Please try again.");
        }
    };

    return (
        <div className="p-8 w-full pt-6 pl-40 pr-40">
            <Form layout="vertical" onFinish={onFinish}>
                <div className="pb-8">
                    <h2 className="text-black text-xl font-bold pb-2 border-b border-gray-400">
                        Create a new address
                    </h2>
                </div>

                {/* Full Name */}
                <Form.Item
                    label={<label className="text-black text-sm font-bold">Full Name</label>}
                    name="fullName"
                    rules={[{ required: true, message: "Please enter your full name" }]}
                >
                    <Input placeholder="Full Name" />
                </Form.Item>

                {/* Country or Region */}
                <Form.Item
                    label={
                        <label className="text-black text-sm font-bold">Country or Region</label>
                    }
                    name="countryOrRegion"
                    rules={[{ required: true, message: "Please enter your country or region" }]}
                >
                    <Input placeholder="Country or Region" />
                </Form.Item>

                {/* Address Line 1 */}
                <Form.Item
                    label={<label className="text-black text-sm font-bold">Address Line 1</label>}
                    name="addressLine1"
                    rules={[{ required: true, message: "Please enter address line 1" }]}
                >
                    <Input placeholder="Address Line 1" />
                </Form.Item>

                {/* Address Line 2 */}
                <Form.Item
                    label={<label className="text-black text-sm font-bold">Address Line 2</label>}
                    name="addressLine2"
                >
                    <Input placeholder="Address Line 2" />
                </Form.Item>

                {/* City */}
                <Form.Item
                    label={<label className="text-black text-sm font-bold">City</label>}
                    name="city"
                    rules={[{ required: true, message: "Please enter your city" }]}
                >
                    <Input placeholder="City" />
                </Form.Item>

                {/* Province and Postal Code */}
                <div className="grid grid-cols-2 gap-4 pb-4">
                    <Form.Item
                        label={<label className="text-black text-sm font-bold">Province</label>}
                        name="province"
                        rules={[{ required: true, message: "Please enter your province" }]}
                    >
                        <Input placeholder="Province" />
                    </Form.Item>
                    <Form.Item
                        label={<label className="text-black text-sm font-bold">Postal Code</label>}
                        name="postalCode"
                        rules={[{ required: true, message: "Please enter your postal code" }]}
                    >
                        <Input placeholder="Postal Code" />
                    </Form.Item>
                </div>

                {/* Phone Number */}
                <Form.Item
                    label={
                        <label className="text-black text-sm font-bold">
                            Phone Number (optional)
                        </label>
                    }
                    name="phoneNumber"
                >
                    <div className="flex w-full">
                        <span className="w-1/5">
                            <Select defaultValue="+66">
                                <Option value="+66">+66</Option>
                                {/* Add more country codes as needed */}
                            </Select>
                        </span>
                        <Input placeholder="Phone Number" className="w-4/5" />
                    </div>
                </Form.Item>

                {/* Default Address Checkbox */}
                <Form.Item name="defaultAddress" valuePropName="checked">
                    <Checkbox>Make default address</Checkbox>
                </Form.Item>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-black text-white font-bold py-2 px-8 rounded-md"
                    >
                        Create Address
                    </Button>
                </div>
            </Form>
        </div>
    );
}
