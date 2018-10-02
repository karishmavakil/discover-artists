import { Injectable } from '@angular/core';
import { Artist } from './artist';
import { ARTISTS } from './mock-artists';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})

export class ArtistService {

  private artistsUrl = 'api/artists';

  getArtists() : Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistsUrl)
      .pipe(
        tap(artists => this.log('fetched artists')),
        catchError(this.handleError('getArtists', []))
      );
  }

  getArtist(id: number): Observable<Artist> {
    const url = `${this.artistsUrl}/${id}`;
    return this.http.get<Artist>(url)
      .pipe(
        tap(_ => this.log(`fetched artist id=${id}`)),
        catchError(this.handleError<Artist>(`getArtist id=${id}`))
       );
  }

  updateArtist(artist: Artist): Observable<any> {
    return this.http.put(this.artistsUrl, artist, httpOptions)
      .pipe(
        tap(_ => this.log(`updated artist id = ${artist.id}`)),
        catchError(this.handleError<any>('updateArtist'))
      );
  }

  addArtist(artist: Artist) : Observable<Artist> {
    return this.http.post<Artist>(this.artistsUrl, artist, httpOptions)
      .pipe(
        tap((artist: Artist) => this.log(`added artist w\id = $artist.id`)),
        catchError(this.handleError<Artist>('addArtist'))
      );
  }

  deleteArtist(artist: Artist | number): Observable<Artist> {
    const id = typeof artist === 'number' ? artist : artist.id;
    const url = `${this.artistsUrl}/${id}`;

    return this.http.delete<Artist>(url , httpOptions)
    .pipe(
      tap(_ => this.log(`deleted artist id=${id}`)),
      catchError(this.handleError<Artist>('deleteArtist'))
    );

  }


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`ArtistService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
