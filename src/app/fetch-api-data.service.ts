import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'; 
//removed the word internal from the above catchError import
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const apiUrl = "https://harmonix-daebd0a88259.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { }

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
          const extractedData = this.extractResponseData(response)
          if (extractedData && extractedData.user) {
            localStorage.setItem('token', extractedData.user);
            console.log(`token: ${extractedData.user}`)
          }
          return extractedData; 
        }), 
        catchError(this.handleError)
        );
  };

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
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addFavorite(userId: string, songId: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + `users/${userId}/songs/${songId}`, {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public removeFavorite(userId: string, songId: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.delete(apiUrl + `users/${userId}/songs/${songId}`, {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.put(apiUrl + `users/${userDetails.Username}`, userDetails,
    {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.delete(apiUrl + `users/${userId}`, {headers: new HttpHeaders(
      {Authorization : 'Bearer ' + token,}
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res; 
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status},` + 
        `Error body is : ${error.error}`
      );
    }
    return throwError(
      'Something bad happened, please try again later.'
    );
  }
}
