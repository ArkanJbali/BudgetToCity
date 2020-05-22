import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHotelComponent } from './dashboard-hotel.component';

describe('DashboardHotelComponent', () => {
  let component: DashboardHotelComponent;
  let fixture: ComponentFixture<DashboardHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
