import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[year]',
    providers: [{provide: NG_VALIDATORS, useExisting: YearInputDirective, multi: true}]
})
export class YearInputDirective implements Validator {

    validate(c: FormControl): ValidationErrors {
        const numValue = Number(c.value);
        const currentYear = new Date().getFullYear();
        const isValid = !isNaN(numValue) && numValue >= currentYear;
        const message = {
            'message': 'The year must be greater than or equal to current year.'          
        };
        return isValid ? null : message;
      }
}
/**
 *  const minYear = currentYear - 85;
        const maxYear = currentYear - 18;
        const isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
        const message = {
          'years': {
            'message': 'The year must be a valid number between ' + minYear + ' and ' + maxYear
          }
        };
 */