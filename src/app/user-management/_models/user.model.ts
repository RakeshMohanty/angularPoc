export interface IUserDetails {
    email: string;
    password: string;
    userType: number;
}
export interface IUserToken {
    accessToken: string;
    refreshToken: string;
}
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    organizationId: number;
    permissions: IPermission[]
}
export interface IPermission {
    name: string;
}
export interface IRequestContext {
    customerIdentifier?: number;
    sponsorIdentifier: number;
    organizationIdentifier: number;
    userType: number;
}