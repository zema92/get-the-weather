import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { City } from 'src/app/shared/models/weather.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  public readonly searchIcon = faSearch;
  public readonly removeIcon = faTimes;
  public cities: Array<City> = new Array<City>();
  public isCitySerched = false;
  public modalRef: BsModalRef;

  @LocalStorage('citiesStorage')
  public storage: any;

  @Output()
  private searchForCityForecast: EventEmitter<Array<City>> = new EventEmitter<Array<City>>();

  @Output()
  private deleteCityForecast: EventEmitter<Array<City>> = new EventEmitter<Array<City>>();

  @ViewChild('searchInput')
  private searchInput: ElementRef;

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.storage = this.localStorageService.retrieve('citiesStorage');
    this.cities = this.storage;

    this.weatherService.city.subscribe((data: City) => {
      if (data) {
        this.cities.push(data);
        this.localStorageService.store('citiesStorage', this.cities);
        this.toastr.success(`${data.name} weather conditions are displayed.`, 'Success!');
        this.searchForCityForecast.emit(this.cities);
      }
    });
  }

  public onSearch(searchTerm: string): void {
    let multipleCities = searchTerm.split(',');

    multipleCities = multipleCities.map(city => {
      return city.trim();
    });

    if (multipleCities.length > 1) {
      this.cities.forEach((city: City) => {
        multipleCities = multipleCities.filter((searchCity: string) => {
          this.checkIfCityAlreadyExists(searchCity);

          return city.name.toLowerCase() !== searchCity.toLowerCase();
        });
      });

      this.weatherService.getMultipleCities(multipleCities);
    } else {
      this.checkIfCityAlreadyExists(searchTerm);

      if (!this.isCitySerched) {
        this.weatherService.getWeatherForCity(searchTerm);
      }
    }

    this.searchInput.nativeElement.value = '';
  }

  public checkIfCityAlreadyExists(searchTerm: string): void {
    this.cities.some((city: City) => {
      this.isCitySerched = city.name.toLowerCase() === searchTerm.toLowerCase() ? true : false;

      if (this.isCitySerched) {
        this.toastr.info(`You've already searched for ${city.name}.`, 'Info!');

        return true;
      }
    });
  }

  public removeCity(cityForRemoval: City): void {
    this.cities = this.cities.filter(city => city.id !== cityForRemoval.id);
    this.storage = this.storage.filter(city => city.id !== cityForRemoval.id);
    this.deleteCityForecast.emit(this.cities);
    this.toastr.info(`${cityForRemoval.name} has been deleted.`, 'Info!');
  }

  public openRemoveCityModal(cityForRemoval: City): void {
    const initialState = {
      city: cityForRemoval
    };

    this.modalRef = this.modalService.show(ModalComponent, {initialState});
    this.modalRef.content.confirmDeleteCity.subscribe((city: City) => {
      this.removeCity(city);
    });
  }
}
