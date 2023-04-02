import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverAffect]'
})
export class HoverAffectDirective {

  constructor(private el:ElementRef ) { }

  originalClass:string='';
  @Input() appHoverAffect:string='';

  @HostListener('mouseenter') onMouseEnter() {
    this.underlineType(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.underlineType(false);
  }

  private underlineType(decorate: boolean) {
    switch (this.appHoverAffect) {
      case 'typeHover':
        // Uncomment line below to underline both type and actual type
        //this.el.nativeElement.style.textDecoration = decorate?'underline':'';
        this.el.nativeElement.nextElementSibling.style.textDecoration = decorate?'underline':'';
        break;
      case 'tagHover':
        this.el.nativeElement.style.fontWeight = decorate?'bold':'normal';
        break;
      case 'contentHover':
        if(decorate){
          this.originalClass = this.el.nativeElement.classList.value;
          this.el.nativeElement.classList.add('hoverContent');
          this.el.nativeElement.classList.remove(this.originalClass.split(' '));
        }else{
          this.el.nativeElement.classList.remove('hoverContent');
          this.el.nativeElement.classList.add(this.originalClass.split(' '));
        }
        break;
    }
  }
}
