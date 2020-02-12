import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {VolunteerSubscriptionComponent} from './pages/volunteer-subscription/volunteer-subscription.component';

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

  constructor(private dialog: MatDialog) {
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
  }

  openVolunteerSubscriptionForm() {
    const dialogRef = this.dialog.open(VolunteerSubscriptionComponent, {
      panelClass: 'card-mat-dialog'
    });
    this.isDialogOpen = true;
    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  save(link: string) {
    window.open(link);
  }

}
