import { Injectable } from '@angular/core';
import { RestClientService } from 'app/framework/rest-client';
import { Observable } from 'rxjs';
import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { MenuItem } from 'app/layout/navigation/menu-item.interface';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private restService: RestClientService) { }

  public fetchNavigationItems(): Observable<ServiceResponse<MenuItem[]>> {
    return this.restService.get<ServiceResponse<MenuItem[]>>('/ui/menuitems');
  }
}