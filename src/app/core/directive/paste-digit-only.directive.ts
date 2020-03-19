import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[fnPasteDigitOnly]'
})
export class PasteDigitOnlyDirective {

  constructor(private element: ElementRef, private control: NgControl) { }
  @HostListener('paste', ['$event'])
  onPaste(event: any) {
    let rawPastedText = '';
    if (window['clipboardData'] && window['clipboardData'].getData) {
      // Special case for the obsolete and non-standard IE browsers 10 and 11
      rawPastedText = window['clipboardData'].getData('Text');
    } else if (event.clipboardData && event.clipboardData.getData) {
      // Normal case with modern browsers
      rawPastedText = event.clipboardData.getData('text/plain');
    }
    const charCode = rawPastedText.charCodeAt(0);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    const formctrls = this.control as any;
    let fromGrp = formctrls._parent as FormGroupDirective;
    fromGrp.reset();
    fromGrp.form.setValue({ code1: rawPastedText.slice(0, 1), code2: rawPastedText.slice(1, 2), code3: rawPastedText.slice(2, 3), code4: rawPastedText.slice(3, 4) });
  }

  @HostListener('keypress', ['$event'])
  onKeypress(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    const eleIndex = this.element.nativeElement.id.charAt(4);
    if (eleIndex < 4) {
      const nextElement = parseInt(eleIndex) + 1;
      document.getElementById('char' + nextElement).focus();
    }
    return true;
  }

}
