import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string): boolean {
    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
