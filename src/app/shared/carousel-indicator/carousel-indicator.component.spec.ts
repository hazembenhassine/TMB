import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselIndicatorComponent } from './carousel-indicator.component';

describe('CarouselIndicatorComponent', () => {
  let component: CarouselIndicatorComponent;
  let fixture: ComponentFixture<CarouselIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
