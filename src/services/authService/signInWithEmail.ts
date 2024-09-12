import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "./signOut";
import { auth } from "src/libs/firebase/firebaseClient";
import { EmailSignInPayload } from "src/interfaces/payload/authPayload";
import { apiPath } from "src/constants/routePath";
import { IS_COOKIE_SET } from "src/constants/sessionStorageKeyName";

export async function signInWithEmail(payload: EmailSignInPayload) {
    try {
        const { email, password } = payload;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userIdToken = await userCredential.user.getIdToken();
        await axios.post(apiPath.AUTH.EMAIL_SIGNIN, payload, {
            headers: { Authorization: `Bearer ${userIdToken}` },
        });
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        await signOut();
        throw new Error("Sign-in with email failed");
    }
}
