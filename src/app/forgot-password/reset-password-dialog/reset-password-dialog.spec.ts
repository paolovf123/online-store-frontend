import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResetPasswordDialog } from './reset-password-dialog';

describe('ResetPasswordDialog', () => {
  let component: ResetPasswordDialog;
  let fixture: ComponentFixture<ResetPasswordDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordDialog],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), { provide: DialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
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
