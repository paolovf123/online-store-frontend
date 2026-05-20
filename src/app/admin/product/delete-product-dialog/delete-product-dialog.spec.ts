import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { DeleteProductDialog } from './delete-product-dialog';

describe('DeleteProductDialog', () => {
  let component: DeleteProductDialog;
  let fixture: ComponentFixture<DeleteProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductDialog],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
