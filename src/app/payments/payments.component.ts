import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];
  username: string = '';

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.username = user?.username ?? '';
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments()
      .subscribe((data: Payment[]) => {
        this.payments = data;
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
