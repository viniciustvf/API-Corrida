import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = 'Bearer ';
  private isUserAuthenticated: boolean = false;

  public mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  public login(email: string, password: string): Observable<String> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json',
    };
    let url = 'http://localhost:8080/auth/token';
    let userLogin = {
      email: email,
      password: password,
    };
    return this.http.post<string>(url, userLogin, httpOptions).pipe(
      tap((data) => {
        this.token += data;
        localStorage.setItem('token', this.token);
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['']);
        this.isUserAuthenticated = true;
      }),
      catchError((error) => {
        this.mostrarMenuEmitter.emit(false);
        console.error('Login error:', error);
        const errorMessage = 'Credenciais inválidas, erro de autenticação.';
        alert(errorMessage);
        this.isUserAuthenticated = false;
        return of('');
      })
    );
  }

  isUserAuth(): boolean {
    return this.isUserAuthenticated;
  }
}
