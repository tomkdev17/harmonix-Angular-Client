import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false ; 

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status
    });
  }

  goHome(): void {
    this.router.navigate(['songs']); 
  }

  goToAccount(): void {
    this.router.navigate(['account']); 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['welcome']);
  }
};
