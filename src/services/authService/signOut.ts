import axios from "axios";
import { signOut as _signOut } from "firebase/auth";
import { auth } from "src/libs/firebase/firebaseClient";
import { apiPath } from "src/constants/routePath";
import { IS_COOKIE_SET } from "src/constants/sessionStorageKeyName";

export async function signOut() {
    try {
        await axios.get(apiPath.AUTH.SIGNOUT);
        sessionStorage.removeItem(IS_COOKIE_SET);
        await _signOut(auth);
    } catch (error: any) {
        throw new Error("Sign-out failed");
    }
}
