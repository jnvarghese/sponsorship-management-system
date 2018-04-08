import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[month]',
    providers: [{provide: NG_VALIDATORS, useExisting: MonthInputDirective, multi: true}]
})
export class MonthInputDirective implements Validator {

    validate(c: FormControl): ValidationErrors {
        const numValue = Number(c.value);
        const minValue = 1;
        const maxValue = 12;
        const isValid = !isNaN(numValue) && numValue >= minValue && numValue <= maxValue;
        const message = {            
            'message': 'The month must be between 1 and 12.'       
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