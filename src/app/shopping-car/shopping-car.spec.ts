import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ShoppingCar } from './shopping-car';

describe('ShoppingCar', () => {
  let component: ShoppingCar;
  let fixture: ComponentFixture<ShoppingCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCar],
      providers: [provideHttpClientTesting(), provideRouter([])]
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
