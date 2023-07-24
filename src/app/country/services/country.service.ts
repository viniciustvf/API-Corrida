import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Country } from '../models/country';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public selectEvent = new EventEmitter();
  private countrySubject = new Subject<Country[]>();
  private urlBase: string = 'http://localhost:8080/country';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    }),
  };

  public insert(country: Country): Observable<Country | null> {
    return this.http
      .post<Country>(this.urlBase, country, this.httpOptions)
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

  public update(country: Country): Observable<Country | null> {
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, this.httpOptions)
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

  public delete(country: Country): Observable<void | null> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    return this.http
      .delete<void>(`${this.urlBase}/${country.id}`, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          return of(null);
        })
      );
  }

  public listAll(): Observable<Country[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Country[]>(this.urlBase, httpOptions)
      .pipe(
        tap((countries) => this.countrySubject.next(countries)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage =
            'Erro ao carregar os dados. Por favor, tente novamente mais tarde.';
          alert(errorMessage);
          return [];
        })
      )
      .subscribe();
    return this.countrySubject.asObservable();
  }

  public getCountryByName(name: string): Observable<Country[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<Country[]>(`${this.urlBase}/name-starting/${name}`, httpOptions)
      .pipe(
        tap((country) => this.countrySubject.next(country)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.countrySubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.countrySubject.asObservable();
  }

  public countrySelected(country: Country) {
    this.selectEvent.emit(country);
  }
}
