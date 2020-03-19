import { RequestHeader, QueryParam } from './index';

export interface RequestOptions {
    responseType?: 'json' | 'text' | 'blob';
    headers?: RequestHeader[];
    params?: QueryParam[];
}
