import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListCategory } from './list-category';

describe('ListCategory', () => {
  let component: ListCategory;
  let fixture: ComponentFixture<ListCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategory],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
