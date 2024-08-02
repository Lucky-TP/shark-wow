import axios from "axios";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as _signOut,
    onAuthStateChanged as _onAuthStateChanged,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "src/libs/firebase/firebaseClient";
import { apiPath } from "src/constants/routePath";
import {
    EmailSignInPayload,
    EmailSignUpWithToken,
    UserIdTokenPayload,
} from "src/interfaces/payload/authPayload";
import { IS_COOKIE_SET } from "src/constants/sessionKeyName";
import { EmailSignUpPayload } from "src/interfaces/payload/authPayload";

export function onAuthStateChanged(callback: (user: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const userIdToken = await userCredential.user.getIdToken();
        const userIdTokenPayload: UserIdTokenPayload = { userIdToken };
        await axios.post(apiPath.AUTH.GOOGLE_SIGNIN, userIdTokenPayload);
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        throw new Error("Sign-in with google failed");
    }
}

export async function signInWithEmail(payload: EmailSignInPayload) {
    try {
        const { email, password } = payload;
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const userIdToken = await userCredential.user.getIdToken();
        const userIdTokenPayload: UserIdTokenPayload = { userIdToken };
        await axios.post(apiPath.AUTH.EMAIL_SIGNIN, userIdTokenPayload);
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        throw new Error("Sign-in with email failed");
    }
}

export async function signUpWithEmail(payload: EmailSignUpPayload) {
    try {
        const { email, password } = payload;
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const userIdToken = await userCredential.user.getIdToken();
        const newPayload: EmailSignUpWithToken = { ...payload, userIdToken };
        await axios.post(apiPath.AUTH.EMAIL_SIGNUP, newPayload);
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        throw new Error("Sign-up with email failed");
    }
}

export async function signOut() {
    try {
        await axios.get(apiPath.AUTH.SIGNOUT);
        sessionStorage.removeItem(IS_COOKIE_SET);
        const result = await _signOut(auth);
    } catch (error: any) {
        throw new Error("Sign-out failed");
    }
}
