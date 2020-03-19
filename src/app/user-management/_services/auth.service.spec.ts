import { TestBed, inject, getTestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { RestClientService } from 'app/framework/rest-client';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { IUserDetails, IUserToken } from 'app/user-management/_models/user.model';
import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { JwtInterceptor } from 'app/interceptors/jwt-interceptor';

xdescribe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let userdetails = {} as IUserDetails
  let mockResponse = {} as ServiceResponse<any>;
  let userToken = {} as IUserToken

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, RestClientService, MessageService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        }
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
    userToken.accessToken = 'tedAbsbss1223';
    userToken.refreshToken = 'trfhhw2322';
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('login(),should reurn data', () => {
    userdetails.email = 'test@tavant.com';
    userdetails.password = 'test123';
    userdetails.userType = 1;
    mockResponse = {
      "responseMessages": {
        "Success": "Sponsor logined Successfully"
      },
      "success": true,
      "results": {
        "accessToken": "xyzt123333yththhtth",
        "refreshToken": "Tzyahhah567Fg"
      }
    };
    service.login(userdetails).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toEqual('/login');
    req.flush(mockResponse);
  });

  it('getUser(),should reurn data', () => {
    userdetails.email = 'test@tavant.com';
    userdetails.password = '';
    userdetails.userType = 1;
    mockResponse = {
      "responseMessages": {
        "Success": "Sponsor profile Successfully"
      },
      "success": true,
      "results": {
        'id': 1,
        'firstName': 'Test',
        'lastName': 'tavant',
        'email': 'test@tavant.com',
        'permissions': []
      }
    };
    service.getUser().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/sponsor/profile');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toEqual('/v1/sponsor/profile');
    req.flush(mockResponse);
  });

  it('saveToken(),should set localstorage', () => {
    service.saveToken(userToken);
    expect(localStorage.getItem('token')).toBeDefined();
    expect(localStorage.getItem('token')).toEqual(JSON.stringify(userToken));
  });
  it('removeToken(),should remove token', () => {
    service.saveToken(userToken);
    service.removeToken();
    expect(localStorage.getItem('token')).toBeNull();
  });
  it('removeLocalStorage(),should remove localstorage', () => {
    service.saveToken(userToken);
    service.removeLocalStorage();
    expect(localStorage.getItem('token')).toBeNull();
  });
  it('getAccessToken(),should get accesstoken', () => {
    service.saveToken(userToken);
    var token = service.getAccessToken();
    expect(localStorage.getItem('token')).toBeDefined();
    expect(token).toEqual(userToken.accessToken);
    service.removeToken();
    var token = service.getAccessToken();
    expect(token).toEqual("");
  });
  it('getRefreshToken(),should get refreshToken', () => {
    service.saveToken(userToken);
    var token = service.getRefreshToken();
    expect(localStorage.getItem('token')).toBeDefined();
    expect(token).toEqual(userToken.refreshToken);
    service.removeToken();
    var token = service.getRefreshToken();
    expect(token).toBeUndefined();
  });
  it('initializeUserDetailModel(),should get called', () => {
    var result = service.initializeUserDetailModel();
    expect(result).toBeDefined();
  });
  
  describe('JWT-interceptor', () => {
    it('should set Authorization header once the service called', () => {
      const dummy_token = 'dndindsaxwxysnes';
      const spyAccessToken = spyOn(AuthService.prototype, 'getAccessToken').and.callFake(() => {
        return dummy_token;
      });
      service.login(userdetails).subscribe((res) => {
      });
      const req = httpMock.expectOne('/login');
      expect(spyAccessToken).toHaveBeenCalled();
      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${dummy_token}`);
      req.flush({});
    });
  });

});