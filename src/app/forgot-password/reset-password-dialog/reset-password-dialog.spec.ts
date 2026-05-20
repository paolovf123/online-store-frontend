import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ResetPasswordDialog } from './reset-password-dialog';

describe('ResetPasswordDialog', () => {
  let component: ResetPasswordDialog;
  let fixture: ComponentFixture<ResetPasswordDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordDialog],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
