import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  public readonly searchIcon = faSearch;

  constructor() { }

  ngOnInit() {
  }

}
