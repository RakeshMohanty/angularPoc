import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    ChangeDetectorRef
} from '@angular/core';

@Component({
    selector: 'fn-load-mask',
    templateUrl: './load-mask.component.html',
    styleUrls: ['./load-mask.component.scss']
})
export class LoadMaskComponent implements OnChanges {
    @Input() isLoading: boolean;
    @Input() isComponent: boolean;
    @Input() isChild: boolean;

    constructor(
        private elementRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnChanges() {
        if (this.isLoading && this.isComponent && !this.isChild) {
            this.elementRef.nativeElement.parentElement.classList.add(
                'position-relative'
            );
        } else {
            this.elementRef.nativeElement.parentElement.classList.remove(
                'position-relative'
            );
        }
        this.cdr.detectChanges();
    }
}
