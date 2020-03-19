import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RegisterService } from './register.service';
import { UserModel } from '../register-account/_models/register.model';
import { RestClientService } from 'app/framework/rest-client';
import { XhrInterceptor } from 'app/interceptors/xhr-interceptor';

describe('RegisterService', () => {

  let httpTestingController: HttpTestingController;
  let service: RegisterService;
  let userModel = {} as UserModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterService, RestClientService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: XhrInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();


    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RegisterService);
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

  describe('verifyEmail()', () => {

    it('returned Observable verifyEmail() should match the right data', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        userModel.email = 'xyz@gmail.com';
        userModel.password = 'aA1aaaaa';
        const mockResponse = {
          "responseMessages": {
            "Success": "Sponsor registered Successfully"
          },
          "success": true,
          "results": {
            "phoneNumber": "9900443345",
            "validityTime": 0
          }
        };
        service.verifyEmail(userModel)
          .subscribe(response => {
            expect(response.success).toEqual(true);
            expect(response.results['phoneNumber']).toEqual("9900443345");
            expect(response.results['validityTime']).toEqual(0);
          });

        const req = httpMock.expectOne('/public/v1/sponsor/lookup');
        expect(req.request.method).toEqual('POST');
        expect(req.request.url).toEqual('/public/v1/sponsor/lookup');
        req.flush(mockResponse);
      }));
  });

  describe('setPassword()', () => {

    it('returned Observable from setPassword() should match the right data', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        userModel.email = 'xxx@gmail.com';
        const mockResponse = {
          "responseMessages": {
            "message": "Sponsor set pasword Successfully"
          },
          "success": true,
          "results": {
            "accessToken": 'fhgf645hgdfhjgf',
            "refreshToken": 'xxxyyyyss'
          }
        };
        service.setPassword(userModel)
          .subscribe(response => {
            expect(response.success).toEqual(true);
            expect(response.results['accessToken']).toEqual('fhgf645hgdfhjgf');
            expect(response.results['refreshToken']).toEqual('xxxyyyyss');
          });

        const req = httpMock.expectOne('/public/v1/sponsor/password/update');
        expect(req.request.method).toEqual('POST');
        expect(req.request.url).toEqual('/public/v1/sponsor/password/update');
        req.flush(mockResponse);
      }));

    it('should return error response', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        userModel.email = 'xxx@gmail.com';
        const mockResponse = {
          "responseMessages": {
            "error": "New password could not be same as previous password, Please change the password"
          },
          "success": false,
          "results": {
            "accessToken": null,
            "refreshToken": null
          }
        };
        service.setPassword(userModel)
          .subscribe(response => {
            expect(response.success).toEqual(false);
            expect(response.results['accessToken']).toEqual(null);
            expect(response.results['refreshToken']).toEqual(null);
          });

        const req = httpMock.expectOne('/public/v1/sponsor/password/update');
        expect(req.request.method).toEqual('POST');
        expect(req.request.url).toEqual('/public/v1/sponsor/password/update');
        req.flush(mockResponse);
      }));
  });

  describe('verifyCode()', () => {

    it('returned Observable from verifyCode() should match the right data', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        userModel.email = 'xxx@gmail.com';
        userModel.password = 'aaaaa';
        userModel.code = '1234';
        const mockResponse = {
          "responseMessages": {
            "message": "Sponsor verify code Successfully"
          },
          "success": true,
          "results": true
        };
        service.verifyCode(userModel)
          .subscribe(response => {
            expect(response.success).toEqual(true);
            expect(response.results).toEqual(true);
          });

        const req = httpMock.expectOne('/public/v1/sponsor/verify/code');
        expect(req.request.method).toEqual('POST');
        expect(req.request.url).toEqual('/public/v1/sponsor/verify/code');
        req.flush(mockResponse);
      }));
  });

  describe('verifyResend()', () => {

    it('returned Observable from verifyResend() should match the right data', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        userModel.email = 'xxx@gmail.com';
        userModel.password = 'aaaaa';
        userModel.code = '1234';
        const mockResponse = {
          "responseMessages": {
            "message": "Sponsor verify resend successfully"
          },
          "success": true,
          "results": true
        };
        service.verifyResend(userModel)
          .subscribe(response => {
            expect(response.success).toEqual(true);
            expect(response.results).toEqual(true);
          });

        const req = httpMock.expectOne('/public/v1/sponsor/resend/code');
        expect(req.request.method).toEqual('POST');
        expect(req.request.url).toEqual('/public/v1/sponsor/resend/code');
        req.flush(mockResponse);
      }));
  });

  describe('xhr-interceptor', () => {
    it('should set header once the service called', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        userModel.email = 'xyz@gmail.com';
        userModel.password = 'aA1aaaaa';
        service.verifyEmail(userModel)
          .subscribe(response => { });
        const req = httpMock.expectOne('/public/v1/sponsor/lookup');
        expect(req.request.headers.get('X-Requested-With')).toEqual('XMLHttpRequest');
        req.flush({});
      }));
  });
});
