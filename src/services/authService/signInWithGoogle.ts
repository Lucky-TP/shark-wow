import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { signOut } from "./signOut";
import { auth } from "src/libs/firebase/firebaseClient";

export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
        // const userIdToken = await userCredential.user.getIdToken();
        // const userIdTokenPayload: UserIdTokenPayload = { userIdToken };
        // await axios.post(apiPath.AUTH.GOOGLE_SIGNIN, userIdTokenPayload);
        // sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        await signOut();
        throw new Error("Sign-in with google failed");
    }
}
