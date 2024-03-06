import { TestBed } from '@angular/core/testing';

import { MoneygerUsersService } from './moneyger-users.service';

describe('MoneygerUsersService', () => {
  let service: MoneygerUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneygerUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
