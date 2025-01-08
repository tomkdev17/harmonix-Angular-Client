import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})

export class AccountPageComponent implements OnInit {
  
  username: any;
  user: any = null;
  songs: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService, 
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.showUser();
    this.getFavs();
  }
  
  getFavs(): void {
    this.fetchApiData.getAllSongs().subscribe((res: any) => {
      this.songs = res.filter(song => this.user.Favorites.includes(song._id)); 
      console.log(this.songs);
      return this.songs; 
    });
  }

  showUser(): void {
    this.fetchApiData.getUser(this.username).subscribe(res => {
      this.user = res; 
      this.favs = res.Favorites || []; 
      console.log(this.user);
    }, (error) => {
      console.error('Failed to fetch user data', error);
    });
  }

  isFavorite(songId: string): boolean {
    return this.favs.includes(songId) ? true : false ; 
  }

  handleUserUpdate(): void {
    const username = localStorage.getItem('username');
    if(username) {
      this.showUser();
    }
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteAccountComponent, {width: '300px'});
  }
  
}
