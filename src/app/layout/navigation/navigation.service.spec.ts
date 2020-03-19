import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NavigationService } from 'app/layout/navigation/navigation.service';
import { MenuItem } from 'app/layout/navigation/menu-item.interface';
import { RestClientService } from 'app/framework/rest-client';

describe('Navigation Service', () => {

  let httpTestingController: HttpTestingController;
  let service: NavigationService;
  let menuItem: MenuItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService, RestClientService
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();


    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(NavigationService);
  });

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.expectOne;
    }
  ));
  it('should be created', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      expect(service).toBeTruthy();
    }));

  describe('fetchNavigationItems()', () => {

    it('returned Observable fetchNavigationItems() should match the right data', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        const mockResponse =
        {
          "responseMessages": {},
          "success": true,
          "results": [
            {
              "name": "Leads",
              "url": "/leads",
              "icon": "leads",
              "active": true
            }
          ]
        }
        service.fetchNavigationItems().subscribe(response => {
          expect(response.success).toEqual(true);
          expect(response.results[0]['name']).toEqual("Leads");
          expect(response.results[0]['url']).toEqual("/leads");
          expect(response.results[0]['icon']).toEqual("leads");
          expect(response.results[0]['active']).toEqual(true);
        });
        const req = httpMock.expectOne('/ui/menuitems')
        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual('/ui/menuitems');
        req.flush(mockResponse);
      }));
  });
});
