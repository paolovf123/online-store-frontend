import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { ResaltarProductCard } from './resaltar-product-card';

describe('ResaltarProductCard', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        ResaltarProductCard,
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
      ],
    });
    const directive = TestBed.inject(ResaltarProductCard);
    expect(directive).toBeTruthy();
  });
});
