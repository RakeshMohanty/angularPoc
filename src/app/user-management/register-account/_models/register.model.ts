export interface UserModel {
    email: string;
    code: string;
    password: string;
    registration: boolean;
}

export interface LookupResponse {
    phoneNumber: string ;
    validityTime : number;
}