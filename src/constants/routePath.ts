const API_BASE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : "https://localhost:3000";

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
        FAVORITE_PROJECTS: `${API_BASE_URL}/api/users/me/favorites`,
        GET_BY_ID: (userId: string) => `${API_BASE_URL}/api/users/${userId}`,
        UPDATE: (userId: string) => `${API_BASE_URL}/api/users/${userId}/update`,
        DELETE: (userId: string) => `${API_BASE_URL}/api/users/${userId}/delete`,
        GET_CREATOR_SUMMARY_STATS: `${API_BASE_URL}/api/users/me/creator-view/summary-stats`,
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
        UPDATE_STATUS: (projectId: string) => `${API_BASE_URL}/api/projects/status/${projectId}`,
    },
    COMMENTS: {
        USER: {
            CREATE: (userId: string) => `${API_BASE_URL}/api/comments/user/${userId}`,
            GET: (userId: string) => `${API_BASE_URL}/api/comments/user/${userId}`,
        },
        PROJECT: {
            CREATE: (projectId: string) => `${API_BASE_URL}/api/comments/project/${projectId}`,
            GET: (projectId: string) => `${API_BASE_URL}/api/comments/project/${projectId}`,
        },
        UPDATE: (commentId: string) => `${API_BASE_URL}/api/comments/${commentId}`,
        DELETE: (commentId: string) => `${API_BASE_URL}/api/comments/${commentId}`,
    },
    REPLIES: {
        CREATE: (parentCommentId: string) =>
            `${API_BASE_URL}/api/replies/create/${parentCommentId}`,
        UPDATE: (replyId: string) => `${API_BASE_URL}/api/replies/${replyId}`,
        DELETE: (replyId: string) => `${API_BASE_URL}/api/replies/${replyId}`,
    },
    ORDERS: {
        GET: (orderId: string) => `${API_BASE_URL}/api/orders/${orderId}`,
    },
    PAYMENTS: {
        CHECKOUT: {
            CREATE: `${API_BASE_URL}/api/payments/checkout`,
        },
        POLLING: {
            GET: (orderId: string) => `${API_BASE_URL}/api/payments/polling/${orderId}`,
        },
    },
};

export const pagePath = {
    ROOT: "/",
    SIGNIN: "/sign-in",
    PROFILE: "/profile",
};
