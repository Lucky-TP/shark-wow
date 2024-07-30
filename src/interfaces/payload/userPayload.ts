interface Address {
    country?: string;
    city?: string;
    province?: string;
    postalCode?: string;
}

interface Contact {
    facebook?: string;
    X?: string;
    youtube?: string;
    phone?: string;
}

export interface SignInPayload {
    userIdToken: string;
}

export interface EditUserPayload {
    firstName?: string;
    lastName?: string;
    aboutMe?: string;
    //profileImageUrl?: string;
    address?: Address;
    contact?: Contact;
}