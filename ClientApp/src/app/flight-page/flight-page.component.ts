import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.css']
})
export class FlightPageComponent implements OnInit {
  total = 1;
  Airports: Airport[] = [];
  myControl = new FormControl();
  myControl2 = new FormControl();
  filteredOptions: Observable<Airport[]>;
  filteredOptions2: Observable<Airport[]>;
  searchFlightForm: FormGroup;
  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<Airport[]>(baseUrl + 'api/Airports').subscribe(result => {
      this.Airports = result;

      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => typeof value === 'string' ? value : value.airportName),
        map(name => name ? this._filter(name) : this.Airports.slice()));
      this.filteredOptions2 = this.myControl2.valueChanges.pipe(startWith(''),
        map(value => typeof value === 'string' ? value : value.airportName),
        map(name => name ? this._filter(name) : this.Airports.slice()));
    }, error => console.error(error));


    
  }
  
  ngOnInit() {
    this.searchFlightForm = new FormGroup({
      fromAirportCode: new FormControl(),
      toAirportCode: new FormControl(),
      departDate: new FormControl(),
      returnDate: new FormControl(),
      travelers: new FormControl(),
    });
    this.searchFlightForm = this.formBuilder.group({
      fromAirportCode: ['', Validators.required],
      toAirportCode: ['', Validators.required],
      departDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      travelers: ['', Validators.required]
    });
    this.searchFlightForm.addControl('from' ,this.myControl);
    this.searchFlightForm.addControl('to' ,this.myControl2);
  }
  onSubmit(newEvent) {
    if (this.searchFlightForm.valid) {
      console.log("Form Submitted!");
    }
    console.log(this.searchFlightForm.value);
  }
  private _filter(value: string): Airport[] {
    const filterValue = value.toLowerCase();
    return this.Airports.filter(option => option.airportName.toLowerCase().indexOf(filterValue) === 0);
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
  displayFn(airport: Airport): string {
    return airport && airport.airportName ? airport.airportName : '';
  }
  decremantTotal() {
      if (this.total !== 1) {
        this.total = this.total - 1;
      }
  }
  incrementTotal() {
    if (this.total !== 8) {
      this.total = this.total + 1;
    }
}

}
interface Airport {
  airportCode: string;
  airportName: string;
}
