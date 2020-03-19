import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEmailComponent } from 'app/leads/customer-email/customer-email.component';

xdescribe('CustomerEmailComponent', () => {
  let component: CustomerEmailComponent;
  let fixture: ComponentFixture<CustomerEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
