import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
})
export class ScrollSpyDirective {

  @Input() public spiedTags = [];
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string;

  // tslint:disable-next-line:variable-name
  constructor(private _el: ElementRef) {}

  @HostListener('window:scroll')
  onScroll() {
    let currentSection: string;
    const children = this._el.nativeElement.children;
    const scrollTop = window.pageYOffset;
    for (const element of children) {
      if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
        if ((element.offsetTop - 50) <= scrollTop) {
          currentSection = element.id;
        }
      }
    }
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }

}
