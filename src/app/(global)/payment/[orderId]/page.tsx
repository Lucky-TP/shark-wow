"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "src/components/global/LoadingPage";
import { StatusCode } from "src/constants/statusCode";
import { pollingPayment } from "src/services/apiService/payments/pollingPayment";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function PaymentCheckingPage({ params }: { params: { orderId: string } }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [slipUrl, setSlipUrl] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const canceled = searchParams.get("canceled");

        if (canceled === "true") {
            setLoading(false);
            router.push("/");
            return;
        }

        const polling = async () => {
            try {
                const response = await pollingPayment(params.orderId);
                if (response.status === StatusCode.BAD_REQUEST) {
                    clearInterval(intervalMount);
                }
                if (response.slipUrl) {
                    setSlipUrl(response.slipUrl);
                    setLoading(false);
                    clearInterval(intervalMount);
                }
            } catch (error) {
                console.error("Error polling payment status:", error);
            }
        };

        const intervalMount = setInterval(() => {
            polling();
        }, 1000);

        return () => clearInterval(intervalMount);
    }, [params.orderId, searchParams]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-orange-50 p-4">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
                <CheckCircleOutlined className="text-orange-500 text-6xl mb-4" />
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Thank You for Your Purchase!</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">
                    Your payment was successful. You can view your payment slip using the link below.
                </p>
                {slipUrl && (
                    <Link href={slipUrl} target="_blank" >
                        <button className="rounded bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 transition-colors">
                            View Your Payment Slip
                        </button>
                    </Link>
                )}
                <Link href="/" className="mt-4 text-orange-500 hover:text-orange-600 hover:underline">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
}
