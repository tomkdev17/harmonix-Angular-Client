import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; 


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  songs: any[] = [];
  favs: any[] = [];
  username: any | null = null;
  user: any = null;
   

  constructor(
    public fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.getUser();
    this.getSongs();
  }

  getUser(): void {
    this.fetchApiData.getUser(this.username).subscribe(res => {
      this.user = res;
      this.favs = this.user.Favorites
      console.log("user: ", this.user);
    })
  }
  isFavorite(songId: string): boolean {
    return this.favs.includes(songId) ? true : false ; 
  }

  getSongs(): void {
    this.fetchApiData.getAllSongs().subscribe((resp: any) => {
      this.songs = resp;
      console.log(this.songs);
      return this.songs; 
    });
  }
}
