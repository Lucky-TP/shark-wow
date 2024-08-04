export const StoragePath = {
    USER: {
        PROFILE: (uid: string) => `users/${uid}/images/profile`,
        CV: (uid: string) => `users/${uid}/files/cv`,
    },
    PROJECT: {},
};
