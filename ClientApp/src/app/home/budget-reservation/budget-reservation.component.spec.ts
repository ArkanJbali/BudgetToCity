import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetReservationComponent } from './budget-reservation.component';

describe('BudgetReservationComponent', () => {
  let component: BudgetReservationComponent;
  let fixture: ComponentFixture<BudgetReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
