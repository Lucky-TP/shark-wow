import { realtimeDbClient } from "src/libs/firebase/firebaseClient";
import { ref, get } from "firebase/database";

export const getRealtimeDbData = async (path: string, id: string) => {
    const dataRef = ref(realtimeDbClient, `${path}/${id}`);
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        throw new Error("No data available");
    }
};
