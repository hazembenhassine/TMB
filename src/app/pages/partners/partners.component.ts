import { Component, OnInit } from '@angular/core';
import {TbmService} from '../../services/tbm.service';
import {Partner} from '../../models/partner';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  rawPartners: Partner[];
  partners: Partner[][];

  constructor(private api: TbmService) { }

  ngOnInit() {
    this.api.getPartners().then((value) => {
      this.rawPartners = value;
    }).catch(() => {
      console.error('Error: Could not fetch partners');
    }).finally(() => {
      this.partners = this.rawPartners.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, []);
    });
  }

}
