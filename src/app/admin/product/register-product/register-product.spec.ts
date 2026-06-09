import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { RegisterProduct } from './register-product';

describe('RegisterProduct', () => {
  let component: RegisterProduct;
  let fixture: ComponentFixture<RegisterProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProduct],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
