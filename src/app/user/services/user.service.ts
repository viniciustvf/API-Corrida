import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public selectEvent = new EventEmitter();
  private usersSubject = new Subject<User[]>();
  private urlBase: string = 'http://localhost:8080/user';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    }),
  };

  public insert(track: User): Observable<User | null> {
    return this.http.post<User>(this.urlBase, track, this.httpOptions).pipe(
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

  public update(user: User): Observable<User | null> {
    return this.http
      .put<User>(`${this.urlBase}/${user.id}`, user, this.httpOptions)
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

  public delete(user: User): Observable<void | null> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    return this.http
      .delete<void>(`${this.urlBase}/${user.id}`, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          return of(null);
        })
      );
  }

  public listAll(): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<User[]>(this.urlBase, httpOptions)
      .pipe(
        tap((users) => this.usersSubject.next(users)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage =
            'Erro ao carregar os dados. Por favor, tente novamente mais tarde.';
          alert(errorMessage);
          return [];
        })
      )
      .subscribe();
    return this.usersSubject.asObservable();
  }

  public getUserByName(name: string): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get<User[]>(`${this.urlBase}/name-starting/${name}`, httpOptions)
      .pipe(
        tap((users) => this.usersSubject.next(users)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.usersSubject.next([]);
          return [];
        })
      )
      .subscribe();
    return this.usersSubject.asObservable();
  }

  public getUserByEmail(email: string): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    return this.http
      .get<User>(`${this.urlBase}/email/${email}`, httpOptions)
      .pipe(
        map((user) => [user]),
        tap((users) => this.usersSubject.next(users)),
        catchError((error: HttpErrorResponse) => {
          console.error('Ocorreu um erro na requisição:', error);
          const errorMessage = error.error?.error || 'Erro desconhecido';
          alert(errorMessage);
          this.usersSubject.next([]);
          return [];
        })
      );
  }

  public userSelected(user: User) {
    this.selectEvent.emit(user);
  }
}
