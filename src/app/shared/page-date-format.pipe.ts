import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageDateFormat'
})
export class PageDateFormatPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    let len;
    let val;
    if (value) {
      val = value.toString().replace(/\D/g, '');
      len = val.length;
      if (len === 2) {
        return val + '/';
      } else if (3 < len && len <= 4) {
        return (val.substr(0, 2)) + '/' + (val.substr(2, 2)) + '/';
      } else if (len > 4 && len <= 10) {
        return (val.substr(0, 2)) + '/' + (val.substr(2, 2)) + '/' + (val.substr(4, 4));
      }
    }
    return value;
  }

}
