import { NgModule } from '@angular/core';
import { DateInputDirective } from './date-input.directive';
import { CommonModule } from '@angular/common';
import { ValidatorService } from './validator.service';
import { YearInputDirective } from './year-input.directive';
import { MonthInputDirective } from './month-input.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DateInputDirective,
        YearInputDirective,
        MonthInputDirective
    ],
    providers: [ValidatorService],
    exports: [
        DateInputDirective,
        YearInputDirective,
        MonthInputDirective
    ]
})
export class SharedModule{}