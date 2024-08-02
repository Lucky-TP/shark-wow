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

export interface EditUserPayload {
    firstName?: string;
    lastName?: string;
    aboutMe?: string;
    address?: Address;
    contact?: Contact;
    profileImageFile?: Blob;
    cvFile?: Blob;
}
