import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgProgress} from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trail Mont Bougarnine';

  constructor() {
  }

  ngOnInit() {
  }

  go(elm: HTMLElement) {
    elm.scrollIntoView({ behavior: 'smooth'});
  }

}
