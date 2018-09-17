import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { City, Coord } from 'src/app/shared/models/weather.model';
import { concat } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { concatAll } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather?APPID=2b24342d09ca39a25be37283148b9a1b';
  public city: Subject<City> = new Subject<City>();

  constructor(private http: HttpClient) { }

  public getWeatherForCity(name: string): void {
    if (name && name.trim().length) {
      const params = new HttpParams().set('q', name);

      this.http.get(this.apiUrl, { params: params }).subscribe((data: City) => {
        this.city.next(data);
      });
    }
  }

  public getMultipleCities(cities: Array<string>): void {
    forkJoin(
      cities.map(city => {
        const params = new HttpParams().set('q', city);

        return this.http.get(this.apiUrl, { params: params });
      })
    )
    .pipe(concatAll())
    .subscribe((data: City) => {
      this.city.next(data);
    });
  }
}
