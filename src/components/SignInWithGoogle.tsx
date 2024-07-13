import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "src/services/authService";
import { Button } from "antd";

export function SignInWithGoogle() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const onSignIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
            router.push("/profile");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Button type="primary" loading={loading} onClick={() => onSignIn()}>
                Sign In with Google
            </Button>
        </div>
    );
}
