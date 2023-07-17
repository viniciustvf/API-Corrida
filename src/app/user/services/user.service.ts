import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public selectEvent = new EventEmitter();
  private usersSubject = new Subject<User[]>();
  private urlBase: string = 'http://localhost:8080/user';

  public listAll(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/name/${name}`;
    return this.http.get<User[]>(url);
  }

  public userSelected(user: User) {
    this.selectEvent.emit(user);
  }
}
