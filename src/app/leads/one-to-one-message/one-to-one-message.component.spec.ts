import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneMessageComponent } from 'app/leads/one-to-one-message/one-to-one-message.component';

xdescribe('OneToOneMessageComponent', () => {
  let component: OneToOneMessageComponent;
  let fixture: ComponentFixture<OneToOneMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneToOneMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
