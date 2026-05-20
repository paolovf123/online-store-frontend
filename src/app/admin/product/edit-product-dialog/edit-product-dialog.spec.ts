import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { EditProductDialog } from './edit-product-dialog';

describe('EditProductDialog', () => {
  let component: EditProductDialog;
  let fixture: ComponentFixture<EditProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductDialog],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
