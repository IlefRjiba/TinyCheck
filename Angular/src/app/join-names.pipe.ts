import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNames'
})
export class JoinNamesPipe implements PipeTransform {

  transform(names: string[]): string {
    
    return names.join(', ');
  }

}
