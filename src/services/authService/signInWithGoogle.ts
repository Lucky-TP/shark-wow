import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signOut } from "./signOut";
import { auth } from "src/libs/firebase/firebaseClient";
import { UserIdTokenPayload } from "src/interfaces/payload/authPayload";
import { apiPath } from "src/constants/routePath";
import { IS_COOKIE_SET } from "src/constants/sessionStorageKeyName";

export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const userIdToken = await userCredential.user.getIdToken();
        const userIdTokenPayload: UserIdTokenPayload = { userIdToken };
        await axios.post(apiPath.AUTH.GOOGLE_SIGNIN, userIdTokenPayload);
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        await signOut();
        throw new Error("Sign-in with google failed");
    }
}
