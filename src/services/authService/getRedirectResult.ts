import axios from "axios";
import { UserCredential, getRedirectResult as _getRedirectResult } from "firebase/auth";
import { signOut } from "./signOut";
import { auth } from "src/libs/firebase/firebaseClient";
import { apiPath } from "src/constants/routePath";

export async function getRedirectResult(): Promise<UserCredential | null> {
    try {
        const result = await _getRedirectResult(auth);
        if (result) {
            const userIdToken = await result.user.getIdToken();
            await axios.post(apiPath.AUTH.GOOGLE_SIGNIN, null, {
                headers: {
                    Authorization: `Bearer ${userIdToken}`,
                },
            });
        }
        return result;
    } catch (error: unknown) {
        await signOut();
        return null;
    }
}
