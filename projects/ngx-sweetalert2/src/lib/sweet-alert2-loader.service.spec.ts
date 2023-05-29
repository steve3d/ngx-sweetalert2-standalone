import { TestBed } from '@angular/core/testing';

import { SweetAlert2LoaderService } from './sweet-alert2-loader.service';

describe('SweetAlert2LoaderService', () => {
  let service: SweetAlert2LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetAlert2LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
