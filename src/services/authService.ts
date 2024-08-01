import axios from "axios";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as _signOut,
    onAuthStateChanged as _onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "src/libs/firebase/firebaseClient";
import { apiPath } from "src/constants/routePath";
import { SignInPayload } from "src/interfaces/payload/userPayload";
import { IS_COOKIE_SET } from "src/constants/sessionKeyName";

export function onAuthStateChanged(callback: (user: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userIdToken = await result.user.getIdToken();
        const payload: SignInPayload = { userIdToken };
        await axios.post(apiPath.AUTH.GOOGLE_SIGNIN, payload);
        sessionStorage.setItem(IS_COOKIE_SET, "true");
    } catch (error: any) {
        console.log(error);
    }
}

export async function signOut() {
    try {
        await axios.get(apiPath.AUTH.SIGNOUT);
        sessionStorage.removeItem(IS_COOKIE_SET);
        const result = await _signOut(auth);
    } catch (error: any) {
        console.log(error);
    }
}
