import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginComponent  } from './preLogin.component';

xdescribe('PreLoginComponent ', () => {
  let component: PreLoginComponent ;
  let fixture: ComponentFixture<PreLoginComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoginComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
