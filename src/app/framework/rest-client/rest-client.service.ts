import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestOptions } from './request-options.interface';
import { RestClient } from './rest-client.interface';

@Injectable()
export class RestClientService implements RestClient {
    constructor(private http: HttpClient) {}

    get<T>(url: string, options: RequestOptions = {}) {
        return this.buildRequest<T>('GET', url, null, options);
    }

    post<T>(url: string, body: any | null, options: RequestOptions = {}) {
        return this.buildRequest<T>('POST', url, body, options);
    }

    patch<T>(url: string, body: any | null, options: RequestOptions = {}) {
        return this.buildRequest<T>('PATCH', url, body, options);
    }

    put<T>(url: string, body: any | null, options: RequestOptions = {}) {
        return this.buildRequest<T>('PUT', url, body, options);
    }

    delete<T>(url: string, body: any | null, options: RequestOptions = {}) {
        return this.buildRequest<T>('DELETE', url, body, options);
    }

    protected buildRequest<T>(
        type: string,
        url: string,
        reqbody: any | null,
        options: RequestOptions
    ): Observable<any> {
        let reqHeaders: HttpHeaders = new HttpHeaders();
        let reqParams: HttpParams = new HttpParams();
        const reqOptions: any = {};

        if (reqbody) {
            reqOptions.body = reqbody;
        }

        if (options.responseType) {
            reqOptions.responseType = options.responseType;
        } else {
            reqOptions.responseType = 'json';
        }

        if (options.headers && options.headers.length > 0) {
            options.headers.forEach(header => {
                reqHeaders = reqHeaders.set(header.name, header.value);
            });
        } else {
            reqHeaders = reqHeaders.set('Content-Type', 'application/json');
        }
        reqOptions.headers = reqHeaders;
        if (options.params && options.params.length > 0) {
            options.params.forEach(param => {
                reqParams = reqParams.set(param.name, param.value);
            });
            reqOptions.params = reqParams;
        }

        return this.http.request<T>(type, url, reqOptions);
    }
}
