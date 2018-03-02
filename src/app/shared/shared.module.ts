import { NgModule } from '@angular/core';
import { DateInputDirective } from './date-input.directive';
import { CommonModule } from '@angular/common';
import { ValidatorService } from './validator.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DateInputDirective
    ],
    providers: [ValidatorService],
    exports: [
        DateInputDirective
    ]
})
export class SharedModule{}