import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Championship } from '../models/championship';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChampionshipService {
  constructor(private http: HttpClient) {}

  public selectEvent = new EventEmitter();
  private championshipSubject = new Subject<Championship[]>();
  private urlBase: string = 'http://localhost:8080/championship';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(championship: Championship): Observable<Championship> {
    return this.http
      .post<Championship>(this.urlBase, championship, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(championship: Championship): Observable<Championship> {
    return this.http
      .put<Championship>(
        `${this.urlBase}/${championship.id}`,
        championship,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(championship: Championship): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${championship.id}`);
  }

  public listAll(): Observable<Championship[]> {
    this.http
      .get<Championship[]>(this.urlBase)
      .subscribe((championship) => this.championshipSubject.next(championship));
    return this.championshipSubject.asObservable();
  }

  public getChampionshipByDescription(
    name: string
  ): Observable<Championship[]> {
    this.http
      .get<Championship[]>(`${this.urlBase}/name-starting/${name}`)
      .subscribe((championship) => this.championshipSubject.next(championship));
    return this.championshipSubject.asObservable();
  }

  public championshipSelected(championship: Championship) {
    this.selectEvent.emit(championship);
  }
}
