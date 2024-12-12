import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Observable } from 'rxjs';
import { ArtistCardComponent } from '../artist-card/artist-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent {

  songs: any[] = [];
  username: any | null = null;
  user: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.getUser();
    this.getSongs();
  }

  getUser(): void {
    this.fetchApiData.getUser(this.username).subscribe(res => {
      this.user = res;
      console.log(this.user);
    })
  }

  getSongs(): void {
    this.fetchApiData.getAllSongs().subscribe((resp: any) => {
      this.songs = resp;
      console.log(this.songs);
      return this.songs; 
    });
  }

  toggleFavorite(songId:string): void {
    const favorites = this.user.Favorites || []; 
    // const isFavorite = favorites.some(song => song === songId);

    const apiCall = this.isFavorite(songId) ? this.removeFavorite(songId) : this.addFavorite(songId);

    apiCall.subscribe({
      next: () => {
        console.log(`Song ${this.isFavorite(songId) ? 'removed from' : 'added to'} favorites`);
        this.getUser();
      }, 
      error: (error) => {
        console.error('Failed to update favorites array');
      }
    })
  }

  isFavorite(songId: string): boolean {
    return this.user.Favorites?.some(song => song === songId) ?? false;
  }

  addFavorite(songId: string): Observable<any> {
    return this.fetchApiData.addFavorite(songId);
  }

  removeFavorite(songId: string): Observable<any> {
    return this.fetchApiData.removeFavorite(songId);
  }

  openArtistDialog(artist: string): void {
    this.fetchApiData.getArtist(artist).subscribe(artistData => {
      this.dialog.open(ArtistCardComponent, {
        width: '500px',
        data: artistData
      });
    }, error => {
      console.error('Failed to fetch artist info', error);
    });
  }

  openGenreDialog(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe(genreData => {
      this.dialog.open(GenreCardComponent, {
        width: '500px',
        data: genreData
      });
    }, error => {
      console.error('Failed to fetch genre info', error);
    });
  }

}
