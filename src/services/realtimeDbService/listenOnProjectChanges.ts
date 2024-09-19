import { realtimeDbClient } from "src/libs/firebase/firebaseClient";
import { ref, onValue, off } from "firebase/database";
import { ProjectRealtimeDbModel } from "src/interfaces/realtimeDatabase/model";
import { RealtimeDbRefPath } from "src/constants/realtimeDatabase/realtimeDbRefPath";

// Function to listen for changes in Realtime Database
export const listenOnProjectChanges = (
    projectId: string,
    callback: (data: ProjectRealtimeDbModel | null) => void
) => {
    const projectRef = ref(realtimeDbClient, `${RealtimeDbRefPath.PROJECT}/${projectId}`);

    // Attach the listener
    const unsubscribe = onValue(projectRef, (snapshot) => {
        if (snapshot.exists()) {
            const projectData = snapshot.val();
            callback(projectData);
        } else {
            callback(null);
        }
    });

    // Return a function to unsubscribe from the listener
    return () => off(projectRef);
};
