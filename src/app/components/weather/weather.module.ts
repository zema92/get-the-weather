import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './weather.routing';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
  CommonModule,
    routing,
    FontAwesomeModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByJtwUxiM0PNvNSLgADf_7pHP4f2zh0qQ'
    })
  ],
  declarations: [
    WeatherListComponent,
    WeatherSearchComponent,
    WeatherForecastComponent
  ],
  providers: []
})
export class WeatherModule {}
