import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Track } from '../models/track';

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

  public insert(user: Track): Observable<Track> {
    return this.http.post<Track>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    );
  }

  public update(user: Track): Observable<Track> {
    return this.http
      .put<Track>(`${this.urlBase}/${user.id}`, user, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(user: Track): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  }

  public listAll(): Observable<Track[]> {
    this.http
      .get<Track[]>(this.urlBase)
      .subscribe((tracks) => this.tracksSubject.next(tracks));
    return this.tracksSubject.asObservable();
  }

  public getTracksByName(name: string): Observable<Track[]> {
    this.http
      .get<Track[]>(`${this.urlBase}/name/${name}`)
      .subscribe((tracks) => this.tracksSubject.next(tracks));
    return this.tracksSubject.asObservable();
  }

  public userSelected(track: Track) {
    this.selectEvent.emit(track);
  }
}
