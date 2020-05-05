import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {
  total = 1;
  searchFlightForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  decremantTotal() {
    if (this.total !== 1) {
      this.total = this.total - 1;
      this.searchFlightForm.controls.travelers.setValue(this.total);
    }
  }
  incrementTotal() {
    if (this.total !== 8) {
      this.total = this.total + 1;
      this.searchFlightForm.controls.travelers.setValue(this.total);
    }
  }
}

