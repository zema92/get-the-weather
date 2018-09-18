import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

const routes: Routes = [
  { path: '', component: WeatherListComponent },
  { path: 'forecast/:id', component: WeatherForecastComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
