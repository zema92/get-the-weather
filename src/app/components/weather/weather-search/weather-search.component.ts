import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { City } from 'src/app/shared/models/weather.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from './../../../shared/components/modal/modal.component';

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

  @Output()
  private searchForCityForecast: EventEmitter<Array<City>> = new EventEmitter<Array<City>>();

  @Output()
  private deleteCityForecast: EventEmitter<Array<City>> = new EventEmitter<Array<City>>();

  @ViewChild('searchInput')
  private searchInput: ElementRef;

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.weatherService.city.subscribe((data: City) => {
      this.cities.push(data);
      this.toastr.success(`${data.name} weather conditions are displayed.`, 'Success!');
      this.searchForCityForecast.emit(this.cities);
    });
  }

  public onSearch(searchTerm: string): void {
    this.cities.some((city: City) => {
      this.isCitySerched = city.name.toLowerCase() === searchTerm ? true : false;

      if (this.isCitySerched) {
        this.toastr.info(`You've already searched for ${city.name}.`, 'Info!');

        return true;
      }
    });

    if (!this.isCitySerched) {
      this.weatherService.getWeatherForCity(searchTerm);
    }

    this.searchInput.nativeElement.value = '';
  }

  public removeCity(cityForRemoval: City): void {
    this.cities = this.cities.filter(city => city.id !== cityForRemoval.id);
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
