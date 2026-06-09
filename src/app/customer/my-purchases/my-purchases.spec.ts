import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { MyPurchases } from './my-purchases';

describe('MyPurchases', () => {
  let component: MyPurchases;
  let fixture: ComponentFixture<MyPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPurchases],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
