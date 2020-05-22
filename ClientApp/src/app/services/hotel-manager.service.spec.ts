import { TestBed } from '@angular/core/testing';

import { HotelManagerService } from './hotel-manager.service';

describe('HotelManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelManagerService = TestBed.get(HotelManagerService);
    expect(service).toBeTruthy();
  });
});
