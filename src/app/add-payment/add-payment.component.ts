import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-payment.component.html',
  styleUrls:['./add-payment.component.scss']

})
export class AddPaymentComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.form = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['USD', Validators.required],
      toCardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]]
    });
  }

  proceed() {
    if (this.form.get('amount')?.invalid || this.form.get('currency')?.invalid || this.form.get('toCardNumber')?.invalid) return;
    const paymentData = {
      amount: this.form.value.amount,
      currency: this.form.value.currency,
      toCardNumber: this.form.value.toCardNumber
    };
    this.router.navigate(['/confirm-pin'], { state: { paymentData } });
  }

  savePayment() {
    this.proceed();
  }

  cancel() {
    this.router.navigate(['/payments']);
  }
}
