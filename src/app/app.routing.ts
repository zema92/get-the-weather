import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


const routes: Routes = [
    { path: '', redirectTo: 'weather', pathMatch: 'full'},
    { path: 'weather', loadChildren: './components/weather/weather.module#WeatherModule'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
