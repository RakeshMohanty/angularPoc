import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMaskComponent } from 'app/core/component/load-mask/load-mask.component';

describe('LoadMaskComponent', () => {
    let component: LoadMaskComponent;
    let fixture: ComponentFixture<LoadMaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadMaskComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadMaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('When load mask component loads', () => {
        beforeEach(() => {
            component.isComponent = true;
            component.isChild = false;
        });

        it('should add position relative class when loading starts', () => {
            component.isLoading = true;
            component.ngOnChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.parentElement.classList).toEqual(
                jasmine.arrayContaining(['position-relative'])
            );
        });

        it('should remove position relative class when loading is done', () => {
            component.isLoading = false;
            component.ngOnChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.parentElement.classList).not.toEqual(
                jasmine.arrayContaining(['position-relative'])
            );
        });
    });

    describe('When modal dialog is present', () => {
        it('should remove position relative class', () => {
            component.isLoading = true;
            component.isComponent = true;
            component.isChild = true;
            component.ngOnChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.parentElement.classList).not.toEqual(
                jasmine.arrayContaining(['position-relative'])
            );
        });
    });

});
