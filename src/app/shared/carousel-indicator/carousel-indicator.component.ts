import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel-indicator',
  templateUrl: './carousel-indicator.component.html',
  styleUrls: ['./carousel-indicator.component.scss']
})
export class CarouselIndicatorComponent implements OnInit {

  @Input() images: any[];
  @Input() activeSlide: number;

  constructor() { }

  ngOnInit() {
  }

}
