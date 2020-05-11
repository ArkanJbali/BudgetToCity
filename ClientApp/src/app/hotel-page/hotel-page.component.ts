import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {
  total = 1;
  searchHotelForm: FormGroup;
  Hotels: IHotel[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<IHotel[]>;
  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private httpClient: HttpClient, private toastrService: ToastrService, private router: Router) {
    http.get<IHotel[]>(baseUrl + 'api/Hotels').subscribe(result => {
      this.Hotels = result;

      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => typeof value === 'string' ? value : value.City),
        map(name => name ? this._filter(name) : this.Hotels.slice()));
      console.log(this.Hotels.slice()[0].city);
    }, error => console.error(error));
  }
  ngOnInit() {
    this.searchHotelForm = new FormGroup({
      HotelCode: new FormControl(),
      checkInDate: new FormControl(),
      checkOutDate: new FormControl(),
      Guests: new FormControl()
    });
    this.searchHotelForm = this.formBuilder.group({
      HotelCode: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      Guests: ['', Validators.required]
    });
    this.searchHotelForm.controls.Guests.setValue(this.total);

  }
  onSubmit(newEvent) {
    this.searchHotelForm.controls.HotelsCode.setValue(this.myControl.value);


    if (this.searchHotelForm.valid) {
     // this.searchHotelForm.controls.departDate.setValue(moment(new Date(this.searchHotelForm.controls.departDate.value)).format('YYYY-MM-DD'));
     // this.searchHotelForm.controls.returnDate.setValue(moment(new Date(this.searchHotelForm.controls.returnDate.value)).format('YYYY-MM-DD'));

     // this.getFlights();
     // setTimeout(() => {
     //   this.scroll();
     // }, 1200);

      console.log(this.searchHotelForm.value);
    }
    else {
      console.log("Form invalid !!!!");
      this.toastrService.error('Should fill all required fields', 'Error');
    }
  }
  private _filter(value: string): IHotel[] {
    console.log("New York City, USA".toLowerCase())
    const filterValue = value.toLowerCase();
    return this.Hotels.filter(option => option.city.toLowerCase().indexOf(filterValue) === 0);
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
  displayFn(hotel: IHotel): string {
    return hotel && hotel.city ? hotel.city : '';
  }
  decremantTotal() {
    if (this.total !== 1) {
      this.total = this.total - 1;
      this.searchHotelForm.controls.travelers.setValue(this.total);
    }
  }
  incrementTotal() {
    if (this.total !== 8) {
      this.total = this.total + 1;
      this.searchHotelForm.controls.travelers.setValue(this.total);
    }
  }
  scroll() {
    var elmnt = document.getElementById("hotelsList");
    elmnt.scrollIntoView(true);

  }
}

interface IHotel {
  Id: string;
  city: string;
}
