import { Injectable } from '@angular/core';
import { SearchArtistResponse } from './searchArtistResponse';
import { LookupArtistResponse } from './lookupArtistResponse';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



const itunesAPI = {
  SEARCH: 'https://itunes.apple.com/search?',
  LOOKUP: 'https://itunes.apple.com/lookup?'
}
const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ITunesService {


  searchiTunesArtist(name: string) : Observable<SearchArtistResponse> {
    console.log(`${itunesAPI.SEARCH}term=${name}`);
    return this.http.get<SearchArtistResponse>(`${itunesAPI.SEARCH}term=${name}`, httpOptions)
    .pipe(
    tap(_ => this.log(`got artist reponse for artist name=${name}`)),
    catchError(this.handleError<SearchArtistResponse>('searchiTunesArtist'))
    );
  }

  lookupiTunesArtist(id: number) : Observable<LookupArtistResponse> {
    console.log(`${itunesAPI.LOOKUP}id=${id}`);
      return this.http.get<LookupArtistResponse>(`${itunesAPI.LOOKUP}id=${id}`, httpOptions)
      .pipe(
      tap(_ => this.log(`got artist reponse for artist id=${id}`)),
      catchError(this.handleError<LookupArtistResponse>('lookupiTunesArtist'))
      );

  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`iTunesService: ${message}`);
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
