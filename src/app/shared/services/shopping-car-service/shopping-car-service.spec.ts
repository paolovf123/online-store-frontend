import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ShoppingCarService } from './shopping-car-service';

describe('ShoppingCarService', () => {
  let service: ShoppingCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting(), provideRouter([])] });
    service = TestBed.inject(ShoppingCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
