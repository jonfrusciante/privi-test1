import { Directive } from '@angular/core';
import { HostListener} from '@angular/core';

@Directive({
  selector: '[appStoppropagation]'
})
export class StoppropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation(); }
  constructor() { }

}
