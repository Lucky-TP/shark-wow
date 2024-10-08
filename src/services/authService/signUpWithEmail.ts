import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "./signOut";
import { auth } from "src/libs/firebase/firebaseClient";
import { EmailSignUpPayload } from "src/interfaces/payload/authPayload";
import { apiPath } from "src/constants/routePath";
import { IS_COOKIE_SET } from "src/constants/sessionStorageKeyName";

export async function signUpWithEmail(payload: EmailSignUpPayload) {
    try {
        const { email, password } = payload;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userIdToken = await userCredential.user.getIdToken();
        await axios.post(apiPath.AUTH.EMAIL_SIGNUP, payload, {
            headers: { Authorization: `Bearer ${userIdToken}` },
        });
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        await signOut();
        throw new Error("Sign-up with email failed");
    }
}
