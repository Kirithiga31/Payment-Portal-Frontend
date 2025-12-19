import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-confirm-pin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirm-pin.component.html',
  styleUrls: ['./confirm-pin.component.scss']
})
export class ConfirmPinComponent implements OnInit {

  paymentData: any;
  pinControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]);

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigation = history.state;
    this.paymentData = navigation?.paymentData || {};
  }

  confirmPin() {
    if (this.pinControl.invalid) return;
    const pin = this.pinControl.value;
    this.paymentService.addPayment({ ...this.paymentData, pin })
      .subscribe(() => {
        alert('Amount sent successfully!');
        this.router.navigate(['/payments']);
      }, error => {
        alert('Payment failed. Please check your PIN and try again.');
      });
  }

  cancel() {
    this.router.navigate(['/add-payment']);
  }
}