import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { QueryParam, RequestHeader, RestClientService } from '.';

describe('RestClientService', () => {
    let restClient: RestClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RestClientService]
        });
        restClient = TestBed.get(RestClientService);
    });

    afterEach(inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            httpMock.verify();
        }
    ));

    it('should be created', () => {
        expect(restClient).toBeTruthy();
    });

    it('should expose GET http method', () => {
        expect(restClient.get).toBeDefined();
    });

    it('should expose POST http method', () => {
        expect(restClient.post).toBeDefined();
    });

    it('should expose PATCH http method', () => {
        expect(restClient.patch).toBeDefined();
    });

    it('should expose PUT http method', () => {
        expect(restClient.put).toBeDefined();
    });

    it('should expose DELETE http method', () => {
        expect(restClient.delete).toBeDefined();
    });

    it('should call get api and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.get('/getdata').subscribe(data => {
                expect(data['name']).toEqual('Test Data');
            });
            const req = httpMock.expectOne('/getdata');
            expect(req.request.method).toEqual('GET');
            expect(req.request.url).toEqual('/getdata');
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call get api with default responseType json', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.get('/getdata').subscribe(data => {
                expect(data['name']).toEqual('Test');
            });
            const req = httpMock.expectOne('/getdata');
            expect(req.request.responseType).toEqual('json');
            req.flush({ name: 'Test' });
        }
    ));

    it('should call post api with null body and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.post('/postdata', null).subscribe(data => {
                expect(data['name']).toEqual('Test Data');
            });
            const req = httpMock.expectOne('/postdata');
            expect(req.request.method).toEqual('POST');
            expect(req.request.url).toEqual('/postdata');
            expect(req.request.body).toEqual(null);
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call post api with body and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient
                .post('/postdata', { data: 'Test Body' })
                .subscribe(data => {
                    expect(data['name']).toEqual('Test Data');
                });
            const req = httpMock.expectOne('/postdata');
            expect(req.request.method).toEqual('POST');
            expect(req.request.url).toEqual('/postdata');
            expect(req.request.body.data).toEqual('Test Body');
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call post api with default responseType json', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.post('/postdata', null).subscribe(data => {
                expect(data['name']).toEqual('Test');
            });
            const req = httpMock.expectOne('/postdata');
            expect(req.request.responseType).toEqual('json');
            req.flush({ name: 'Test' });
        }
    ));

    it('should call patch api with null body and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.patch('/patchdata', null).subscribe(data => {
                expect(data['name']).toEqual('Test Data');
            });
            const req = httpMock.expectOne('/patchdata');
            expect(req.request.method).toEqual('PATCH');
            expect(req.request.url).toEqual('/patchdata');
            expect(req.request.body).toEqual(null);
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call patch api with body and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient
                .patch('/patchdata', { data: 'Test Body' })
                .subscribe(data => {
                    expect(data['name']).toEqual('Test Data');
                });
            const req = httpMock.expectOne('/patchdata');
            expect(req.request.method).toEqual('PATCH');
            expect(req.request.url).toEqual('/patchdata');
            expect(req.request.body.data).toEqual('Test Body');
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call patch api with default responseType json', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.patch('/patchdata', null).subscribe(data => {
                expect(data['name']).toEqual('Test');
            });
            const req = httpMock.expectOne('/patchdata');
            expect(req.request.responseType).toEqual('json');
            req.flush({ name: 'Test' });
        }
    ));

    it('should call put api with null body and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.put('/putdata', null).subscribe(data => {
                expect(data['name']).toEqual('Test Data');
            });
            const req = httpMock.expectOne('/putdata');
            expect(req.request.method).toEqual('PUT');
            expect(req.request.url).toEqual('/putdata');
            expect(req.request.body).toEqual(null);
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call put api with body and get test data', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient
                .put('/putdata', { data: 'Test Body' })
                .subscribe(data => {
                    expect(data['name']).toEqual('Test Data');
                });
            const req = httpMock.expectOne('/putdata');
            expect(req.request.method).toEqual('PUT');
            expect(req.request.url).toEqual('/putdata');
            expect(req.request.body.data).toEqual('Test Body');
            req.flush({ name: 'Test Data' });
        }
    ));

    it('should call put api with default responseType json', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient.put('/putdata', null).subscribe(data => {
                expect(data['name']).toEqual('Test');
            });
            const req = httpMock.expectOne('/putdata');
            expect(req.request.responseType).toEqual('json');
            req.flush({ name: 'Test' });
        }
    ));

    // it('should call delete api and get test data', inject(
    //     [HttpTestingController],
    //     (httpMock: HttpTestingController) => {
    //         restClient.delete('/deletedata').subscribe(data => {
    //             expect(data['name']).toEqual('Test Data');
    //         });
    //         const req = httpMock.expectOne('/deletedata');
    //         expect(req.request.method).toEqual('DELETE');
    //         expect(req.request.url).toEqual('/deletedata');
    //         req.flush({ name: 'Test Data' });
    //     }
    // ));

    // it('should call delete api with default responseType json', inject(
    //     [HttpTestingController],
    //     (httpMock: HttpTestingController) => {
    //         restClient.delete('/deletedata').subscribe(data => {
    //             expect(data['name']).toEqual('Test');
    //         });
    //         const req = httpMock.expectOne('/deletedata');
    //         expect(req.request.responseType).toEqual('json');
    //         req.flush({ name: 'Test' });
    //     }
    // ));

    it('should call get api with passed headers', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            const testHeaders = [
                new RequestHeader('X-Test-Header', 'test-value')
            ];
            restClient
                .get('/getdata', { headers: testHeaders })
                .subscribe(data => {
                    expect(data['name']).toEqual('Test');
                });
            const req = httpMock.expectOne('/getdata');
            expect(req.request.headers.get('X-Test-Header')).toEqual(
                'test-value'
            );
            req.flush({ name: 'Test' });
        }
    ));

    it('should call get api with passed query params', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            const testParams = [new QueryParam('testquery', 'testparam')];
            restClient
                .get('/getdata', { params: testParams })
                .subscribe(data => {
                    expect(data['name']).toEqual('Test');
                });
            const req = httpMock.expectOne('/getdata?testquery=testparam');
            expect(req.request.params.get('testquery')).toEqual('testparam');
            req.flush({ name: 'Test' });
        }
    ));

    it('should call get api with responseType text', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            restClient
                .get('/getdata', { responseType: 'text' })
                .subscribe(data => {
                    expect(data).toEqual('Test');
                });
            const req = httpMock.expectOne('/getdata');
            expect(req.request.responseType).toEqual('text');
            req.flush('Test');
        }
    ));
});
