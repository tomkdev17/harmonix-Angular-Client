import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loginStatus.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login() {
    this.loginStatus.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
  }
}
