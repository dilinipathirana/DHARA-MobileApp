import { TestBed } from '@angular/core/testing';

import { WlpredictService } from './wlpredict.service';

describe('WlpredictService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WlpredictService = TestBed.get(WlpredictService);
    expect(service).toBeTruthy();
  });
});
