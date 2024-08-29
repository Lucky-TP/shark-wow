const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const apiPath = {
    AUTH: {
        // BASE: `${API_BASE_URL}/api/auth`,
        GOOGLE_SIGNIN: `${API_BASE_URL}/api/auth/signin/google`,
        EMAIL_SIGNIN: `${API_BASE_URL}/api/auth/signin/email`,
        EMAIL_SIGNUP: `${API_BASE_URL}/api/auth/signup/email`,
        SIGNOUT: `${API_BASE_URL}/api/auth/signout`,
    },
    USERS: {
        CREATE: `${API_BASE_URL}/api/users/create`,
        GET_SELF: `${API_BASE_URL}/api/users/me`,
        EDIT_SELF: `${API_BASE_URL}/api/users/me`,
        GET_TEN_POPULAR: `${API_BASE_URL}/api/users/getTenPopular`,
        FAVORITE_PROJECTS: `${API_BASE_URL}/api/users/favorites`,
        GET_BY_ID: (userId: string) => `${API_BASE_URL}/api/users/${userId}`,
        UPDATE: (userId: string) => `${API_BASE_URL}/api/users/${userId}/update`,
        DELETE: (userId: string) => `${API_BASE_URL}/api/users/${userId}/delete`,
    },
    FILES: {
        UPLOAD: `${API_BASE_URL}/api/files/upload`,
        GET: (fileId: string) => `${API_BASE_URL}/api/files/${fileId}`,
        DELETE: (fileId: string) => `${API_BASE_URL}/api/files/${fileId}/delete`,
    },
    PROJECTS: {
        CREATE: `${API_BASE_URL}/api/projects/create`,
        GET_ALL: `${API_BASE_URL}/api/projects`,
        GET_BY_CATEGORIES: `${API_BASE_URL}/api/projects/getByCategories`,
        GET_TEN_POPULAR: `${API_BASE_URL}/api/projects/getTenPopular`,
        GET_BY_ID: (projectId: string) => `${API_BASE_URL}/api/projects/${projectId}`,
        UPDATE: (projectId: string) => `${API_BASE_URL}/api/projects/${projectId}`,
        DELETE: (projectId: string) => `${API_BASE_URL}/api/projects/${projectId}`,
    },
    COMMENTS: {
        CREATE: `${API_BASE_URL}/api/comments/create`,
        GET_BY_PROJECT_ID: (projectId: string) =>
            `${API_BASE_URL}/api/comments/project/${projectId}`,
        DELETE: (commentId: string) => `${API_BASE_URL}/api/comments/${commentId}/delete`,
    },
};

export const pagePath = {
    ROOT: "/",
    SIGNIN: "/sign-in",
    PROFILE: "/profile",
};
