import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Trail Mont Bougarnine';
  toggle = true;
  isDialogOpen = false;
  activeSection = 'home';
  isMenuCollapsed = true;

  constructor() {
  }

  ngOnInit() {
  }

  go(elm: HTMLElement) {
    elm.scrollIntoView({ behavior: 'smooth'});
  }

  goMobile(elm: HTMLElement) {
    this.go(elm);
    this.isMenuCollapsed = true;
  }

  @HostListener('window:scroll', ['$event'])
  collapseHeader() {
    this.toggle = window.pageYOffset === 0;
  }

  setDialogState(state: boolean) {
    this.isDialogOpen = state;
  }

  onSectionChange($event: string) {
    this.activeSection = $event;
    console.log($event);
  }
}
