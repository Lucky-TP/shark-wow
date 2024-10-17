"use client";

import { Form, Input, Button, message } from "antd"; // Import message for notifications
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { editSelf } from "src/services/apiService/users/editSelf";
import { useUserData } from "src/context/useUserData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddressSetting() {
    const [loading, setLoading] = useState<boolean>(false);
    const { user: initUser, refetchUserData } = useUserData();
    const [form] = Form.useForm();
    const router = useRouter();


     useEffect(() => {
         if (!initUser) {
             return;
         }

         form.setFieldsValue({
             country: initUser.address[0]?.country,
             city: initUser.address[0]?.city,
             province: initUser.address[0]?.province,
             postalCode: initUser.address[0]?.postalCode,
         });
     }, [initUser]);


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
            message.success("User's address updated successfully!");
            refetchUserData();
            router.push(`/profile`);
        } catch (error) {
            message.error("User's address update failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-8 pl-40 pr-40 pt-6">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="pb-8">
                    <h2 className="border-b border-gray-400 pb-2 text-xl font-bold text-black">
                        Address
                    </h2>
                </div>

                <Form.Item
                    label={<label className="text-sm font-bold text-black">Country</label>}
                    name="country"
                    rules={[{ required: true, message: "Please enter your country" }]}
                >
                    <Input placeholder="Country" />
                </Form.Item>

                <Form.Item
                    label={<label className="text-sm font-bold text-black">City</label>}
                    name="city"
                    rules={[{ required: true, message: "Please enter your city" }]}
                >
                    <Input placeholder="City" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4 pb-4">
                    <Form.Item
                        label={<label className="text-sm font-bold text-black">Province</label>}
                        name="province"
                        rules={[{ required: true, message: "Please enter your province" }]}
                    >
                        <Input placeholder="Province" />
                    </Form.Item>
                    <Form.Item
                        label={<label className="text-sm font-bold text-black">Postal Code</label>}
                        name="postalCode"
                        rules={[{ required: true, message: "Please enter your postal code" }]}
                    >
                        <Input placeholder="Postal Code" />
                    </Form.Item>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                        className="w-full bg-orange-600"
                    >
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
}
