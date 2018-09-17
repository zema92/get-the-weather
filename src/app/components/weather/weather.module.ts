import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './weather.routing';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
  CommonModule,
    routing,
    FontAwesomeModule,
    MomentModule
  ],
  declarations: [
    WeatherListComponent,
    WeatherSearchComponent
  ],
  providers: []
})
export class WeatherModule {}
