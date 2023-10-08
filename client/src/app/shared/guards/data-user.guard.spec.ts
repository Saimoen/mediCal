import { TestBed } from '@angular/core/testing';

import { DataUserGuard } from './data-user.guard';

describe('DataUserGuard', () => {
  let guard: DataUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
