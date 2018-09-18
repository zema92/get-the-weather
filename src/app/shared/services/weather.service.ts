import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { City, Coord } from 'src/app/shared/models/weather.model';
import { forkJoin } from 'rxjs';
import { concatAll, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather?APPID=2b24342d09ca39a25be37283148b9a1b';
  public city: BehaviorSubject<City> = new BehaviorSubject<City>(null);

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

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

        return this.http.get(this.apiUrl, { params: params }).pipe(
          catchError((error, obs) => {
            return of(null);
          })
        );
      })
    )
    .pipe(concatAll())
    .subscribe((data: City) => {
      this.city.next(data);
    });
  }
}
