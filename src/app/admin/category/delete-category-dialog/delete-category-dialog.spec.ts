import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { DeleteCategoryDialog } from './delete-category-dialog';

describe('DeleteCategoryDialog', () => {
  let component: DeleteCategoryDialog;
  let fixture: ComponentFixture<DeleteCategoryDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategoryDialog],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
