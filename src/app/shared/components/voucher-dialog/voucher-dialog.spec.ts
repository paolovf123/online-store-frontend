import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { VoucherDialog } from './voucher-dialog';

describe('VoucherDialog', () => {
  let component: VoucherDialog;
  let fixture: ComponentFixture<VoucherDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherDialog],
      providers: [provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
