import { Component, OnInit } from '@angular/core';
import { City } from './../../../shared/models/weather.model';
import * as moment from 'moment';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  public cityList: Array<City> = new Array<City>();
  public today = moment().format();

  @LocalStorage('citiesStorage')
  public storage: any;

  constructor() { }

  ngOnInit() {
    this.cityList = this.storage;
  }

  public onSearchForCityForecast(cityList: Array<City>): void {
    this.cityList = cityList;
  }

  public onDeleteCityForecast(cityList: Array<City>): void {
    this.cityList = cityList;
  }
}
