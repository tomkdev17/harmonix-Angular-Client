import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})

export class AccountPageComponent implements OnInit {
  
  username: any;
  user: any = null; 

  constructor(
    public fetchApiData: FetchApiDataService, 
    public snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.showUser();
  }

  showUser(): void {
    this.fetchApiData.getUser(this.username).subscribe(currentUserData => {
      this.user = currentUserData; 
      console.log(this.user);
    }, (error) => {
      console.error('Failed to fetch user data', error);
    });
  }
  handleUserUpdate(): void {
    const username = localStorage.getItem('username');
    if(username) {
      this.showUser();
    }
  }

  bybyUser(): void {
    this.fetchApiData.deleteUser(this.username).subscribe(
      () => {
      this.snackbar.open('Account successfully deleted.', 'OK', {
        duration: 3000
      });
      this.authService.logout();
      // localStorage.clear();
      this.router.navigate(['welcome'])
    }, (error) => {
      this.snackbar.open('Failed to delete account', 'OK', {
        duration: 3000
      });
      console.error('Error deleting user', error);
    }
    ); 
  }
}
