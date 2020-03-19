export interface ICustomer {
    customerResponse: ICustomerResponse[];
    totalCount: number;
    gridSize: number;
}

export interface ICustomerResponse {
    id: number;
    name: string;
    email: string;
    status: string;
    address: string;
    phoneNumber: string;
    region: string

}
export interface ICustomerInfoRequest {
    pageIndex: number;
    sortingOrder: string;
    lastName?: string;
    email?: string;
    phoneNo?: string;

}
export interface ICustomerInfoRequest {
    pageIndex: number;
    sortingOrder: string;
}

export interface ICustomerMessageRequest {
    to : number;
    content: string;
}

export interface ICustomerMessageResponse {
    content: string;
    date: string;
    fromSponsor: boolean;
}
