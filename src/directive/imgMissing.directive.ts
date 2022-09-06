import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appImgMissing]',
})
export class ImgMissingDirective {
  constructor(private el: ElementRef) {}

  @HostListener('error')
  private onErrorImage() {
    this.el.nativeElement.src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png';
  }
}
