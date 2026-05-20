import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListProduct } from './list-product';

describe('ListProduct', () => {
  let component: ListProduct;
  let fixture: ComponentFixture<ListProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProduct],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
