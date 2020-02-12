import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit {

  mapURL: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.mapURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://iframe.tracedetrail.fr/fr/trace/output2/109896/osm/1111084667');
  }

}
