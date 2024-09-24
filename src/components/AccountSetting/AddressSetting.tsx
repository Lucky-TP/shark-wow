"use client";

import { Form, Input, Button, message } from "antd"; // Import message for notifications
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { editSelf } from "src/services/apiService/users/editSelf";
import { useUserData } from "src/context/useUserData";
import { useState } from "react";

export default function AddressSetting() {
    const [loading, setLoading] = useState<boolean>(false);
    const { user: initUser, refetchUserData } = useUserData();
    const onFinish = async (values: any) => {
        setLoading(true);
        const userPayload: Partial<EditUserPayload> = {
            address: [
                {
                    country: values.country,
                    city: values.city,
                    province: values.province,
                    postalCode: values.postalCode,
                },
            ],
        };
        try {
            await editSelf(userPayload);
            message.success("User Profile updated successfully!");
            refetchUserData();
        } catch (error) {
            message.error("User Profile update failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 w-full pt-6 pl-40 pr-40">
            <Form layout="vertical" onFinish={onFinish}>
                <div className="pb-8">
                    <h2 className="text-black text-xl font-bold pb-2 border-b border-gray-400">
                        Address
                    </h2>
                </div>

                <Form.Item
                    label={
                        <label className="text-black text-sm font-bold">Country</label>
                    }
                    name="country"
                    rules={[{ required: true, message: "Please enter your country" }]}
                >
                    <Input placeholder="Country" />
                </Form.Item>

                <Form.Item
                    label={<label className="text-black text-sm font-bold">City</label>}
                    name="city"
                    rules={[{ required: true, message: "Please enter your city" }]}
                >
                    <Input placeholder="City" />
                </Form.Item>

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

                <div className="flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
}
