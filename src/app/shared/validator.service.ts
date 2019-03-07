import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

export class ValidatorService {
    constructor() { }

    public noSpecialChars(event) {
        const e = <KeyboardEvent>event;
        let k;
        if (e.key === 'Tab' || e.key === 'TAB') {
            return;
        }
        k = event.keyCode;
        if (k === 8 || k === 32 || (k >= 48 && k <= 57)) {
            return;
        }
        e.preventDefault();
    }
    public validateDate(c: AbstractControl): { [key: string]: boolean } {
        let now = moment();
        let viewDate = c.value;
        let viewDateformatted = moment(c.value, 'MM/DD/YYYY', true);
        if (viewDate && viewDate != null && viewDate.length === 10 && (!viewDateformatted.isValid())) { //|| moment(viewDateformatted).isAfter(now)
            return { invalidDate: true };
        }
    }

     public limitCharacters(event) {
         const e = <KeyboardEvent>event;
        let val = event.target.value.toString().replace(/\D/g, '');
        if (val.length === 10 && e.keyCode !== 8) {
            e.preventDefault();
        }
    }
    public datesCompare(dates: FormGroup) {
        let dateOfBirthCtrl = dates.controls['dateOfBirth'];
        let dateOfLossCtrl = dates.controls['dateOfLoss'];
        let dateOfBirth = dateOfBirthCtrl.value;
        let dateOfLoss = dateOfLossCtrl.value;
        let dateOfBirthFrmt = moment(dateOfBirth, 'MM/DD/YYYY', true);
        let dateOfLossFrmt = moment(dateOfLoss, 'MM/DD/YYYY', true);
        if (dateOfBirth && dateOfLoss
            && dateOfBirthCtrl.errors === null
            && dateOfLossCtrl.errors === null
            && moment(dateOfBirthFrmt).isAfter(dateOfLossFrmt)) {
            return { afterDate: true };
        } else {
            return null;
        }
    }
}
