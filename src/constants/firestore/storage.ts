export const BUCKET_NAME = "shark-wow.appspot.com";

export const StoragePath = {
    BASE_URL: `https://storage.googleapis.com/${BUCKET_NAME}`,
    USER: {
        PROFILE: (uid: string) => `users/${uid}/images/profile`,
        CV: (uid: string) => `users/${uid}/files/cv`,
    },
    PROJECT: {
        CAROUSEL_IMAGES: (uid: string, projectId: string) =>
            `projects/${uid}/${projectId}/${new Date().getTime()}`,
    },
};
