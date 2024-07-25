"use client";
import SigninPlaceHolder from "src/components/authen/Signin";
import { SignInWithGoogle } from "src/components/SignInWithGoogle";


export default function SigninPage() {
    return (
        <>
            <SigninPlaceHolder/>
            <SignInWithGoogle />
        </>
    );
}
