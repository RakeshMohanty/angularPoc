import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RestClientService } from 'app/framework/rest-client';
import { XhrInterceptor } from 'app/interceptors/xhr-interceptor';
import { ProductCategoryService } from 'app/leads/product-category/product-category.service';

describe('ProductCategoryService', () => {

    let httpTestingController: HttpTestingController;
    let service: ProductCategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProductCategoryService, RestClientService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: XhrInterceptor,
                    multi: true,
                }
            ],
            imports: [HttpClientTestingModule]
        }).compileComponents();

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(ProductCategoryService);
    });

    afterEach(inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            httpMock.verify();
        }
    ));

    it('should be created', inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            expect(service).toBeTruthy();
        }));

    describe('getProductCategories()', () => {

        it('returned Observable getProductCategories() should match the right data', inject(
            [HttpTestingController],
            (httpMock: HttpTestingController) => {
                const mockResponse = { "responseMessages": {}, "success": true, "results": [{ "id": 5, "productCategoryName": "Mortgage" }, { "id": 7, "productCategoryName": "Jumbo Mortgage" }] };
                service.getProductCategories()
                    .subscribe(response => {
                        expect(response.success).toEqual(true);
                        expect(response.results).toEqual(mockResponse.results);
                    });

                const req = httpMock.expectOne('/v1/sponsor/productcategories');
                expect(req.request.method).toEqual('GET');
                expect(req.request.url).toEqual('/v1/sponsor/productcategories');
                req.flush(mockResponse);
            }));
    });

    describe('getProductOffers()', () => {

        it('returned Observable getProductOffers() should match the right data', inject(
            [HttpTestingController],
            (httpMock: HttpTestingController) => {
                const productId = 2;
                const mockResponse = {
                    "responseMessages": {}, "success": true, "results": [{
                        "productName": "Auto + Home Bundle",
                        "offerName": "Special Rate for Leader 1 Customers1",
                        "shortDescription": "Monthly Payment - TBD",
                        "longDescription": "Interest Rate : 4.950% APR : 5.34% Discount Points : .405",
                        "valid": "2020-03-01 00:00:00.0"
                    }, {
                        "productName": "Purchase -30Yr Fixed",
                        "offerName": "offer name2",
                        "shortDescription": "Interest Rate : 3.74 % APR : 3.84 % Please lock in the rate",
                        "longDescription": "Interest Rate : 3.74 % APR : 3.84 % Please lock in the rate",
                        "valid": "2020-03-01 12:48:52.297"
                    }]
                };
                service.getProductOffers(productId)
                    .subscribe(response => {
                        expect(response.success).toEqual(true);                        
                    });

                const req = httpMock.expectOne('/v1/sponsor/offers/' + productId);
                expect(req.request.method).toEqual('GET');
                expect(req.request.url).toEqual('/v1/sponsor/offers/' + productId);
                req.flush(mockResponse);
            }));
    });
});