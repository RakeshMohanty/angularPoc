export interface VendorCategory {
    id: number;
    categoryName: string;
}

export interface VendorInformation {
    categories: VendorCategory[];
    contactEmail: string;
    contactNumber: number;
    contactName: string;
    id: number;
    name: string;
    serviceDescription: string;
    serviceSummary: string;
    website: string;
}

export interface VendorOfferDetail {
    category: VendorCategory;
    description: string;
    featured: boolean;
    contactUs: boolean;
    newLink: boolean;
    website: boolean;
    name: string;
    offerLink: string;
    validFrom: string;
    validTill: string;
    vendorId: number;
    id: number;
}

