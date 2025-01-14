import { Injectable } from '@angular/core';
import { catchError, map,  } from 'rxjs/operators'; 
//removed the word internal from the above catchError import
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { response } from 'express';
import { AuthService } from './auth.service';



const apiUrl = "https://harmonix-daebd0a88259.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  };

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        map((response) => {
          const extractedData = this.extractResponseData(response) ; 
          return extractedData ;
        }), 
        tap((extractedData) => {
          if(extractedData && extractedData.user) {
            const token = extractedData.user;
            const username = userDetails.Username;
            
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            this.authService.login();
          }
        }),
        catchError(this.handleError) 
      );
  }
  
  public getAllSongs(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get<any>(apiUrl + 'songs', {headers: new HttpHeaders(
        {Authorization: 'Bearer ' + token,}
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public getOneSong(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get<any>(apiUrl + `songs/${title}`, {headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getArtist(artist: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get<any>(apiUrl + `songs/artist/${artist}`, {headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get<any>(apiUrl + `songs/genre/${genre}`, {headers: new HttpHeaders(
      {Authorization: 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + `users/${userId}`, {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map((response) => {
        const data = this.extractResponseData(response);
        if(data && data.Birthday) {
          data.Birthday = this.formatDate(data.Birthday);
        }
        return data;
      }),
      catchError(this.handleError)
    );
  }

  public addFavorite(songId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('username');

    return this.http.post(apiUrl + `users/${userId}/songs/${songId}`, 
    null,
    {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public removeFavorite(songId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('username');

    return this.http.delete(apiUrl + `users/${userId}/songs/${songId}`, 
    {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    return this.http.put(apiUrl + `users/${username}`, userDetails,
    {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders({
      Authorization : 'Bearer ' + token,
    }),
    responseType: 'text'
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res; 
    return body || {};
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;
    const year = date.getFullYear();

    return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    console.error('Full error object:', error);  
    let errorMessage = 'An unknown error occurred!';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: Status code ${error.status}, ` + `Error body: ${JSON.stringify(error.error)}`;
    }
    return throwError(() => new Error(errorMessage)); 
  }
}
