import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Payment } from '../models/payment.model';

@Component({
  selector: 'app-edit-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {

  form: FormGroup;
  paymentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['USD', Validators.required],
      toCardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]]
    });
  }

  ngOnInit(): void {
    this.paymentId = +this.route.snapshot.params['id'];
    if (this.paymentId) {
      this.loadPayment(this.paymentId);
    }
  }

  loadPayment(id: number): void {
    // Assuming backend has a getPaymentById endpoint
    this.paymentService.getPayment(id).subscribe((payment: Payment) => {
      this.form.patchValue({
        amount: payment.amount,
        currency: payment.currency,
        toCardNumber: payment.toCard.cardNumber
      });
    });
  }

  savePayment() {
    if (this.form.invalid || !this.paymentId) return;
    const { amount, currency, toCardNumber } = this.form.value;
    this.paymentService.updatePayment(this.paymentId, { amount, currency, type: 'CREDIT', toCardNumber })
      .subscribe(() => this.router.navigate(['/payments']));
  }

  cancel() {
    this.router.navigate(['/payments']);
  }
}
