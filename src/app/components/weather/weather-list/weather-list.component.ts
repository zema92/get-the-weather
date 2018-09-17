import { Component, OnInit } from '@angular/core';
import { City } from './../../../shared/models/weather.model';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  public cityList: Array<City> = new Array<City>();

  constructor() { }

  ngOnInit() {
  }

  public onSearchForCityForecast(cityList: Array<City>): void {
    this.cityList = cityList;
  }

}
