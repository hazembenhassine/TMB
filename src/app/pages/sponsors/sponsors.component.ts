import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {Sponsor} from '../../models/sponsor';
import {TbmService} from '../../services/tbm.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  rawFiles: Sponsor[];

  images: string[];
  desktopImages: string[];

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  @ViewChild('mobileCarousel', {static : true}) mobileCarousel: NgbCarousel;

  activeSlide = 0;
  mobileActiveSlide = 0;

  constructor(private api: TbmService) { }

  ngOnInit() {
    this.api.getSponsors().then((value) => {
      this.rawFiles = value;
    }).catch(() => {
      console.error('Error: Could not fetch sponsors');
    }).then(() => {
      this.images = this.rawFiles.map((sponsor) => sponsor.image);
      this.desktopImages = this.images.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, []);
    });
  }

  incrementCarouselCounter(event) {
    this.activeSlide = +event.current;
  }

  incrementMobileCarouselCounter(event) {
    this.mobileActiveSlide = +event.current;
  }

}
