import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/shared/models/weather.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public city: City;

  @Output()
  public confirmDeleteCity: EventEmitter<City> = new EventEmitter<City>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  public onConfirm(): void {
    this.confirmDeleteCity.emit(this.city);
    this.bsModalRef.hide();
  }
}
