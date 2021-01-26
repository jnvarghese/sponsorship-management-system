import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';

@Directive({
    selector: '[validate]',
    exportAs: "validator"
})
export class Validation {
    @Input('validate') validateType: string;
    status: string;
    value: any;

    constructor(private el: ElementRef) {
    }

    @HostListener('keyup') OnKeyUp() {

        if (this.el.nativeElement.value.length > 0) {
            if (this.validateType === "number") {
                let value = this.el.nativeElement.value;
                let isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
                if (!isNumeric.test(value)) {
                    this.status = 'Only numeric values allowed.';
                } else {
                    this.status = value.length < 3 ? 'Required three characters' : '';
                }
            }
            if (this.validateType === "noSpaceText") {
                let value = this.el.nativeElement.value;
                if (value.indexOf(' ') >= 0) {
                    this.status = 'No spaces allowed.';
                } else {
                    this.status = value.length < 1 ? 'Required minimum one character' : '';
                }
            }
            if (this.validateType === "text") {
                let value = this.el.nativeElement.value;
                this.status = value.length < 3 ? 'Required three characters' : '';
            }
            this.value = this.el.nativeElement.value;
        } else {
            this.value = '';
        }
    }
}