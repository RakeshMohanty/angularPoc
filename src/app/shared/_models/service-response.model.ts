export interface ServiceResponse<T> {
    responseMessages: { [key: string]: string };
    results: T;
    success: boolean;
}
