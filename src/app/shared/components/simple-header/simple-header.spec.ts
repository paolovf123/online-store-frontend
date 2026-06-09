import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { SimpleHeader } from './simple-header';

describe('SimpleHeader', () => {
  let component: SimpleHeader;
  let fixture: ComponentFixture<SimpleHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleHeader],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
