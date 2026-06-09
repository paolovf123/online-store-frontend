import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { LoggedInHeader } from './logged-in-header';

describe('LoggedInHeader', () => {
  let component: LoggedInHeader;
  let fixture: ComponentFixture<LoggedInHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInHeader],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
