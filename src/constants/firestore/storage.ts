export const BUCKET_NAME = "shark-wow.appspot.com";

export const StoragePath = {
    BASE_URL: `https://storage.googleapis.com/${BUCKET_NAME}`,
    USER: {
        PROFILE: (uid: string) => `users/${uid}/images/profile`,
        CV: (uid: string) => `users/${uid}/files/cv`,
        GENERAL: (uid: string) => `users/${uid}/general/${new Date().getTime()}`,
    },
    PROJECT: {
        CAROUSEL_IMAGES: (uid: string, projectId: string) =>
            `projects/${uid}/${projectId}/carousel/${new Date().getTime()}`,
        GENERAL: (uid: string, projectId: string) =>
            `projects/${uid}/${projectId}/general/${new Date().getTime()}`,
    },
};
