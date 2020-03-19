import { Observable } from 'rxjs';

import { RequestOptions } from './request-options.interface';

export interface RestClient {
    get(url: string, options: RequestOptions): Observable<any>;
    post(
        url: string,
        body: any | null,
        options: RequestOptions
    ): Observable<any>;
    patch(
        url: string,
        body: any | null,
        options: RequestOptions
    ): Observable<any>;
    put(
        url: string,
        body: any | null,
        options: RequestOptions
    ): Observable<any>;
    delete(url: string, options: RequestOptions): Observable<any>;
}
