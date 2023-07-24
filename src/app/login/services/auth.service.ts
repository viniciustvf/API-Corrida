import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = 'Bearer ';
  private isUserAuthenticated: boolean = false;

  public showMenuEmitter = new EventEmitter<boolean>();

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
        this.showMenuEmitter.emit(true);
        this.router.navigate(['']);
        this.isUserAuthenticated = true;
      }),
      catchError((error) => {
        this.showMenuEmitter.emit(false);
        console.error('Login error:', error);
        const errorMessage = 'Credenciais inválidas, erro de autenticação.';
        alert(errorMessage);
        this.isUserAuthenticated = false;
        return of('');
      })
    );
  }

  isTokenValid(token: string): boolean {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }

    const payloadBase64 = tokenParts[1];
    const payload: { exp?: number } = JSON.parse(atob(payloadBase64));
    let expirationTimeInMilliSeconds = payload.exp;

    if (!expirationTimeInMilliSeconds) {
      return false;
    } else {
      expirationTimeInMilliSeconds = expirationTimeInMilliSeconds * 1000;
    }
    const currentTimeInMilliSeconds = Math.floor(Date.now());
    return currentTimeInMilliSeconds < expirationTimeInMilliSeconds;
  }

  isUserAuth(): boolean {
    let tokenLocal = localStorage.getItem('token');
    if (tokenLocal) {
      if (this.isTokenValid(tokenLocal)) {
        this.showMenuEmitter.emit(true);
        return (this.isUserAuthenticated = true);
      }
    }
    return this.isUserAuthenticated;
  }
}
