import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddProductBuyDialog } from './add-product-buy-dialog';

describe('AddProductBuyDialog', () => {
  let component: AddProductBuyDialog;
  let fixture: ComponentFixture<AddProductBuyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductBuyDialog],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), { provide: DialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: { id: 1, nombre: 'Producto Test', descripcion: 'desc', descripcionExtensa: null, precioUnitario: 9.99, imageUrl: null, stock: 1, categoriaProductoId: 1, nombreCategoriaProducto: 'Categoria', status: 'A' } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductBuyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
