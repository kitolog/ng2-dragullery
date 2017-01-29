import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[ng-dragullery]',
})
export class DragulleryDirective {

  constructor(private el: ElementRef) {
  }

}
