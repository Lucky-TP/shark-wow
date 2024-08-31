interface Stage {
    minimumFunding: number;
    currentFunding: number;
    goalFunding: number;
}

export interface PopularCreator {
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    email: string;
    totalProjectSuccess: number;
    totalSupporter: number;
}

export interface Address {
    country: string;
    city: string;
    province: string;
    postalCode: string;
}
