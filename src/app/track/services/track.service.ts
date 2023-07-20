import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Track } from '../models/track';
import { Country } from '../../country/models/country';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private http: HttpClient) {}

  public selectEvent = new EventEmitter();
  private tracksSubject = new Subject<Track[]>();
  private urlBase: string = 'http://localhost:8080/track';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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

  public delete(user: Track): Observable<void | null> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Ocorreu um erro na requisição:', error);
        const errorMessage = error.error?.error || 'Erro desconhecido';
        alert(errorMessage);
        return of(null);
      })
    );
  }

  public listAll(): Observable<Track[]> {
    this.http
      .get<Track[]>(this.urlBase)
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
    this.http
      .get<Track[]>(`${this.urlBase}/name/${name}`)
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
    this.http
      .get<Track[]>(`${this.urlBase}/country/${country.id}`)
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

  public showError(error: any): void {
    console.error('Ocorreu um erro: ', error);
  }
}
