import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent {
  @Input() user: any;
  @Output() userUpdated = new EventEmitter<void>();

  newUserData = {Username: '', Password: '', Email: '', Birthday: ''}; 

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
  ) {}

  ngOnChanges(): void {
    if(this.user){
      this.newUserData = {
        Username: this.user.Username,
        Email: this.user.Email,
        Password: '',
        Birthday: this.user.Birthday
      }
    }
  }
  updateUser(): void {
    this.fetchApiData.editUser(this.newUserData).subscribe( () => {
      this.userUpdated.emit();
      this.snackbar.open('Update Successful!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackbar.open(result, 'OK', {
        duration: 2000
      });
    })
  }
}
