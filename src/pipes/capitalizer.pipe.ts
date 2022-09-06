import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizer' })
export class Capitalizer implements PipeTransform {
  transform(name: string): string {
    const nameCapitalized = name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    return nameCapitalized;
  }
}
