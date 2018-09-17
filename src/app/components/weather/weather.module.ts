import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './weather.routing';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
  CommonModule,
    routing,
    FontAwesomeModule
  ],
  declarations: [
    WeatherListComponent,
    WeatherSearchComponent
  ],
  providers: []
})
export class WeatherModule {}
