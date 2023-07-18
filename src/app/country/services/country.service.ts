import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, tap } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  public selectEvent = new EventEmitter();
  private countrySubject = new Subject<Country[]>();
  private urlBase: string = 'http://localhost:8080/country';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public insert(country: Country): Observable<Country> {
    return this.http
      .post<Country>(this.urlBase, country, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public update(country: Country): Observable<Country> {
    return this.http
      .put<Country>(`${this.urlBase}/${country.id}`, country, this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  public delete(country: Country): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${country.id}`);
  }

  public listAll(): Observable<Country[]> {
    this.http
      .get<Country[]>(this.urlBase)
      .subscribe((country) => this.countrySubject.next(country));
    return this.countrySubject.asObservable();
  }

  public getCountryByName(name: string): Observable<Country[]> {
    this.http
      .get<Country[]>(`${this.urlBase}/name-starting/${name}`)
      .subscribe((country) => this.countrySubject.next(country));
    return this.countrySubject.asObservable();
  }

  public countrySelected(country: Country) {
    this.selectEvent.emit(country);
  }
}
