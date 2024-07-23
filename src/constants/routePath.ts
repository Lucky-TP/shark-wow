const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const apiPath = {
    AUTH: `${API_BASE_URL}/api/auth`,
    USERS: {
        CREATE: `${API_BASE_URL}/api/users/create`,
        GET_SELF: `${API_BASE_URL}/api/users/me`,
    },
    FILES: {
        UPLOAD: `${API_BASE_URL}/api/files/upload`,
    },
};

export const pagePath = {
    ROOT: "/",
    SIGNIN: "/sign-in",
    PROFILE: "/profile",
};
