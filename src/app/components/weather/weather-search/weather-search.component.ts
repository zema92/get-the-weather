import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { City } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  public readonly searchIcon = faSearch;
  public cities: Array<City> = new Array<City>();

  @Output()
  private searchForCityForecast: EventEmitter<Array<City>> = new EventEmitter<Array<City>>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.city.subscribe((data: City) => {
      this.cities.push(data);
      console.log(this.cities);
      this.searchForCityForecast.emit(this.cities);
    });
  }

  public onSearch(searchTerm: string): void {
    this.weatherService.getWeatherForCity(searchTerm);
  }
}
