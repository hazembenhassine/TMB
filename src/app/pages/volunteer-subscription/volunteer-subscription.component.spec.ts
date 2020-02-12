import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSubscriptionComponent } from './volunteer-subscription.component';

describe('VolunteerSubscriptionComponent', () => {
  let component: VolunteerSubscriptionComponent;
  let fixture: ComponentFixture<VolunteerSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
