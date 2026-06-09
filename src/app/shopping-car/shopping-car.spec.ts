import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ShoppingCar } from './shopping-car';

describe('ShoppingCar', () => {
  let component: ShoppingCar;
  let fixture: ComponentFixture<ShoppingCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCar],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
