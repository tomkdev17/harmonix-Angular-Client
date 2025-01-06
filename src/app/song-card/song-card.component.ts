import { Component, OnInit, Input } from '@angular/core';
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
  @Input() song : any;
  @Input() user : any; 
  @Input() isFavorite! : (songId : string) => boolean; 
  @Input() favs! : any[]; 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    ) {}

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

    toggleFavorite(songId:string): void {

      const apiCall = this.isFavorite(songId) ? this.fetchApiData.removeFavorite(songId) : this.fetchApiData.addFavorite(songId);

      apiCall.subscribe({
        next: (res) => {
          this.favs = res.Favorites
          console.log('api favs: ', res.Favorites);
          console.log('favs array: ', this.favs);
          console.log(`Song ${this.isFavorite(songId) ? 'added to' : 'removed from'} favorites`);
        }, 
        error: (error) => {
          console.error('Failed to update favorites array', error);
        }
      })
    }
  }


