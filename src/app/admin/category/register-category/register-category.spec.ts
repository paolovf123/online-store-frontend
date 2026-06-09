import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { RegisterCategory } from './register-category';

describe('RegisterCategory', () => {
  let component: RegisterCategory;
  let fixture: ComponentFixture<RegisterCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCategory],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
