import { TestBed } from '@angular/core/testing';

import { TbmService } from './tbm.service';

describe('TbmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TbmService = TestBed.get(TbmService);
    expect(service).toBeTruthy();
  });
});
