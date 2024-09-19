import { realtimeDbAdmin } from "src/libs/firebase/firebaseAdmin";

export function getRealtimeDbRef(path: string, id: string) {
    return realtimeDbAdmin.ref(`${path}/${id}`);
}
