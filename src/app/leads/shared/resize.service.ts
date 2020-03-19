import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ResizeService {

  private resizeSubject: BehaviorSubject<number | string> = new BehaviorSubject(window.innerWidth);

  constructor() {
  }

  get onResize$(): Observable<number | string> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  onResize(size: number | string) {
    this.resizeSubject.next(size);
  }

}