import { Type } from '@angular/core';
import { Component } from '@angular/compiler/src/core';

import { ProductOffer } from 'app/leads/_models/leads.model';

export class ProductData {
  public componentData: any;
  public component: Type<Component>;
  public index: number;

  constructor(component: Type<any>, componentData: ProductOffer[]) {
    this.componentData = componentData;
    this.component = component;
  }
}