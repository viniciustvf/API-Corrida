import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Championship } from '../models/championship';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChampionshipService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public selectEvent = new EventEmitter();
  private championshipSubject = new Subject<Championship[]>();
  private urlBase: string = 'http://localhost:8080/championship';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    }),
  };

  public insert(championship: Championship): Observable<Championship | null> {
    return this.http
      .post<Championship>(this.urlBase, championship, this.httpOptions)
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

  public update(championship: Championship): Observable<Championship | null> {
    return this.http
      .put<Championship>(
        `${this.urlBase}/${championship.id}`,
        championship,
        this.httpOptions
      )
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

  public delete(championship: Championship): Observable<void | null> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    return this.http
      .delete<void>(`${this.urlBase}/${championship.id}`, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          return of(null);
        })
      );
  }

  public listAll(): Observable<Championship[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Championship[]>(this.urlBase, httpOptions)
      .pipe(
        tap((championships) => this.championshipSubject.next(championships)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage =
            'Erro ao carregar os dados. Por favor, tente novamente mais tarde.';
          alert(errorMessage);
          return [];
        })
      )
      .subscribe();
    return this.championshipSubject.asObservable();
  }

  public getChampionshipByDescription(
    name: string
  ): Observable<Championship[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Championship[]>(
        `${this.urlBase}/description-starting/${name}`,
        httpOptions
      )
      .pipe(
        tap((championships) => this.championshipSubject.next(championships)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.championshipSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.championshipSubject.asObservable();
  }

  public getChampionshipByYear(year: number): Observable<Championship[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Championship[]>(`${this.urlBase}/year/${year}`, httpOptions)
      .pipe(
        tap((championships) => this.championshipSubject.next(championships)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.championshipSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.championshipSubject.asObservable();
  }

  public getChampionshipByYearBetween(
    yearI: number,
    yearF: number
  ): Observable<Championship[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Championship[]>(
        `${this.urlBase}/year-between/${yearI}/${yearF}`,
        httpOptions
      )
      .pipe(
        tap((championships) => this.championshipSubject.next(championships)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.championshipSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.championshipSubject.asObservable();
  }

  public championshipSelected(championship: Championship) {
    this.selectEvent.emit(championship);
  }
}
