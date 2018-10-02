import { TestBed } from '@angular/core/testing';

import { ITunesService } from './i-tunes.service';

describe('ITunesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ITunesService = TestBed.get(ITunesService);
    expect(service).toBeTruthy();
  });
});
