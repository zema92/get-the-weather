import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../../../shared/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  public forecast: any;
  public forecastPerDay: Array<Forecast> = new Array<Forecast>();

  constructor(private weatherService: WeatherService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const cityId = this.activatedRoute.snapshot.params['id'];
    this.weatherService.getForecastForCity(cityId);
    this.weatherService.forecast.subscribe((data: Forecast) => {
      this.forecast = data;

      for (const index in this.forecast.list) {
        if (this.forecast.list.hasOwnProperty(index)) {
          if (+index % 8 === 0) {
            this.forecastPerDay = [...this.forecastPerDay, this.forecast.list[index]];
          }
        }
      }
    });
  }
}
