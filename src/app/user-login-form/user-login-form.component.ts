import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  
  @Input() userData = {Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialogRef: MatDialogRef<UserLoginFormComponent>, 
    public snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open('User Login Successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['mainview']); 
    }, (result) => {
      this.snackBar.open('User Login Failed :(', 'OK', {
        duration: 2000
      });
    });
  }
}
