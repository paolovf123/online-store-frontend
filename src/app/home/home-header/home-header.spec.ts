import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { HomeHeader } from './home-header';

describe('HomeHeader', () => {
  let component: HomeHeader;
  let fixture: ComponentFixture<HomeHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeader],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
