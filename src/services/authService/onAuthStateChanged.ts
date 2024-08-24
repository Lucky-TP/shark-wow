import { onAuthStateChanged as _onAuthStateChanged, User } from "firebase/auth";
import { auth } from "src/libs/firebase/firebaseClient";

export function onAuthStateChanged(callback: (user: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
}
