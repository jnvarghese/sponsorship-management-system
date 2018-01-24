import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from './constants';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(args === 'toDB'){
        return super.transform(value, Constants.DATE_FMT_TO_SERVICE);
    }else{
        return super.transform(value, Constants.DATE_FMT_TO_UI);
    }   
  }
}