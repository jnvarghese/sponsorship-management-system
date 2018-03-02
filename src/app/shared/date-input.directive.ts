import { Directive, Input, HostListener, Renderer, ElementRef } from '@angular/core';
import { PageDateFormatPipe } from './page-date-format.pipe';
import { ValidatorService } from './validator.service';

@Directive({
    selector: '[dateInputFormatter]'
})
export class DateInputDirective {
    constructor(
        private renderer: Renderer,
        private el: ElementRef,
        private validatorService:ValidatorService
    ) { }
    @HostListener('change', ['$event'])
    @HostListener('keypress', ['$event']) public keypress(e) {
        this.validatorService.noSpecialChars(event);
        let value = this.el.nativeElement.value;
        this.el.nativeElement.value = new PageDateFormatPipe().transform(value);
    }
}
