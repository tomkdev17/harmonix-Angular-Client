import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})

export class DeleteAccountComponent {

  username: any | null = null; 

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>, 
    public snackbar: MatSnackBar, 
    private fetchApiData: FetchApiDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() : void {
    this.username = localStorage.getItem('username');
  }

  bybyUser(): void {
    this.fetchApiData.deleteUser(this.username).subscribe(
      () => {
      this.snackbar.open('Account successfully deleted.', 'OK', {
        duration: 3000
      });
      this.authService.logout();
      localStorage.clear();
      this.router.navigate(['welcome'])
    }, (error) => {
      this.snackbar.open('Failed to delete account', 'OK', {
        duration: 3000
      });
      console.error('Error deleting user', error);
    }
    ); 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


