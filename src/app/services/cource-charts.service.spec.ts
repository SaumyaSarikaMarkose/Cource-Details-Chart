import { TestBed } from '@angular/core/testing';

import { CourceChartsService } from './cource-charts.service';

describe('CourceChartsService', () => {
  let service: CourceChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourceChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
