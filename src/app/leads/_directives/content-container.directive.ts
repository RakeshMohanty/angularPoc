import { Directive, ViewContainerRef, Type, ComponentFactoryResolver, Input, ChangeDetectorRef, ComponentRef, ComponentFactory, OnChanges, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/compiler/src/core';

import { ProductOffer } from 'app/leads/_models/leads.model';

@Directive({
  selector: "[content-container]"
})
export class ContentContainerDirective implements OnChanges, AfterViewInit, OnDestroy {
  @Input('component') component: Type<Component>;
  @Input('componentData') componentData: ProductOffer[];
  @Input('isMobileView') isMobileView: boolean;
  @Output() onOfferSelect = new EventEmitter<void>();
  componentRef: ComponentRef<any>;

  constructor(public viewContainerRef: ViewContainerRef, private changeDetectorRef: ChangeDetectorRef,
    public componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  updateComponent() {
    // get a component factory for our TabComponent
    if (this.component) {
      let componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.viewContainerRef.clear();
      // create a component instance
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      // set the according properties on our component instance
      this.componentRef.instance.productData = this.componentData;
      this.componentRef.instance.isMobileView = this.isMobileView;
      this.changeDetectorRef.detectChanges();
      this.componentRef.instance.onOfferClick.subscribe((data) => {
        this.onOfferSelect.emit(data);
      });
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}