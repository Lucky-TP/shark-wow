"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import LoadingPage from "src/components/global/LoadingPage";
import { useRouter } from "next/navigation";
import { StripePaymentMethod } from "src/constants/paymentMethod";
import { TransactionType } from "src/interfaces/models/enums";
import { checkout } from "src/services/apiService/payments/checkout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function PreviewPage() {
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            console.log(
                "Order placed! You will receive an email confirmation."
            );
        }

        if (query.get("canceled")) {
            console.log(
                "Order canceled -- continue to shop around and checkout when youre ready."
            );
        }
    }, []);

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onCheckout = async () => {
        const payload: CheckoutPayload = {
            projectId: "D6W9TUDkkWs1PCDHtwUE",
            stageId: 1,
            stageName: "Concept",
            fundingCost: 100,
            transactionType: TransactionType.FUNDING,
            paymentMethod: StripePaymentMethod.Card,
        };
        try {
            setLoading(true);
            const response = await checkout(payload);
            router.replace(response.redirectUrl);
        } catch (err: unknown) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <form
            onSubmit={onCheckout}
            className="h-screen flex items-center justify-center"
        >
            <section className="bg-white flex flex-col w-full max-w-md h-28 rounded-lg justify-between p-4">
                <button
                    type="submit"
                    role="link"
                    className="h-9 bg-indigo-600 rounded-md text-white font-semibold cursor-pointer transition duration-200 ease-in-out shadow-md hover:opacity-80"
                >
                    Checkout
                </button>
            </section>
        </form>
    );
}
