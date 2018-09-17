import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WeatherListComponent } from './weather-list/weather-list.component';

const routes: Routes = [
  { path: '', component: WeatherListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
