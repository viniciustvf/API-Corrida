import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { Track } from '../models/track';
import { Country } from '../../country/models/country';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public selectEvent = new EventEmitter();
  private tracksSubject = new Subject<Track[]>();
  private urlBase: string = 'http://localhost:8080/track';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    }),
  };

  public insert(track: Track): Observable<Track | null> {
    return this.http.post<Track>(this.urlBase, track, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ocorreu um erro na requisição:', error);
        const errorMessage = error.error?.error || 'Erro desconhecido';
        alert(errorMessage);
        return of(null);
      })
    );
  }

  public update(track: Track): Observable<Track | null> {
    return this.http
      .put<Track>(`${this.urlBase}/${track.id}`, track, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          return of(null);
        })
      );
  }

  public delete(track: Track): Observable<void | null> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    return this.http
      .delete<void>(`${this.urlBase}/${track.id}`, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          return of(null);
        })
      );
  }

  public listAll(): Observable<Track[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Track[]>(this.urlBase, httpOptions)
      .pipe(
        tap((tracks) => this.tracksSubject.next(tracks)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage =
            'Erro ao carregar os dados. Por favor, tente novamente mais tarde.';
          alert(errorMessage);
          return [];
        })
      )
      .subscribe();
    return this.tracksSubject.asObservable();
  }

  public getTracksByName(name: string): Observable<Track[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Track[]>(`${this.urlBase}/name/${name}`, httpOptions)
      .pipe(
        tap((tracks) => this.tracksSubject.next(tracks)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.tracksSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.tracksSubject.asObservable();
  }

  public getTracksByCountry(country: Country): Observable<Track[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Track[]>(`${this.urlBase}/country/${country.id}`, httpOptions)
      .pipe(
        tap((tracks) => this.tracksSubject.next(tracks)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.tracksSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.tracksSubject.asObservable();
  }

  public getTracksBySizeBetween(
    sizeI: number,
    sizeF: number
  ): Observable<Track[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Track[]>(`${this.urlBase}/size/${sizeI}/${sizeF}`, httpOptions)
      .pipe(
        tap((tracks) => this.tracksSubject.next(tracks)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.tracksSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.tracksSubject.asObservable();
  }

  public userSelected(track: Track) {
    this.selectEvent.emit(track);
  }
}
