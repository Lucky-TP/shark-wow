import axios from "axios";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as _signOut,
    onAuthStateChanged as _onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "src/libs/firebase/firebaseClient";
import { SignTokenPayload } from "src/interfaces/payload";
import { apiPath } from "src/constants/routePath";

export function onAuthStateChanged(callback: (user: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userIdToken = await result.user.getIdToken();
        const payload: SignTokenPayload = { userIdToken };
        await axios.post(apiPath.AUTH, payload);
        await axios.post(apiPath.CREATE_USER);
    } catch (error: any) {
        console.log(error);
    }
}

export async function signOut() {
    try {
        const result = await _signOut(auth);
        await axios.get(apiPath.AUTH);
    } catch (error: any) {
        console.log(error);
    }
}