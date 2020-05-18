import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackagesComponent } from './tour-packages.component';

describe('TourPackagesComponent', () => {
  let component: TourPackagesComponent;
  let fixture: ComponentFixture<TourPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
