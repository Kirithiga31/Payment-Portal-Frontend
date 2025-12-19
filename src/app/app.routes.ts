import { Routes } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { LoginComponent } from './login/login.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { ConfirmPinComponent } from './confirm-pin/confirm-pin.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'payments', component: PaymentsComponent, canActivate: [authGuard] },
  { path: 'add-payment', component: AddPaymentComponent, canActivate: [authGuard] },
  { path: 'confirm-pin', component: ConfirmPinComponent, canActivate: [authGuard] },
  { path: 'edit-payment/:id', component: EditPaymentComponent, canActivate: [authGuard] }
];
