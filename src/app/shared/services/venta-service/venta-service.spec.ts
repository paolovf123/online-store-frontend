import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { VentaService } from './venta-service';

describe('VentaService', () => {
  let service: VentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting(), provideRouter([])] });
    service = TestBed.inject(VentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
