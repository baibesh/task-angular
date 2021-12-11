import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: { first: string; last: string }): string {
    return value.first + ' ' + value.last;
  }
}
