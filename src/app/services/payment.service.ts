import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Payment } from '../models/payment.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${environment.apiUrl}/api/payments`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPayments() {
    const user = this.auth.getUser();
    let params = new HttpParams();
    if (user && user.username) {
      params = params.set('username', user.username);
    }
    const getPaymentsUrl = this.apiUrl + "/getPaymentsByUserName";
    return this.http.get<Payment[]>(getPaymentsUrl, { params });
  }

  getPayment(id: number) {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  addPayment(payment: { amount: number; currency: string; toCardNumber: string; pin: string; clientRequestId?: string; createdBy?: string }) {
    payment.clientRequestId = crypto.randomUUID();
    const user = this.auth.getUser();
    if (user && (user as any).username) {
      payment.createdBy = (user as any).username;
    }
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  updatePayment(id: number, payment: { amount: number; currency: string; type: string; toCardNumber: string }) {
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, payment);
  }
}
