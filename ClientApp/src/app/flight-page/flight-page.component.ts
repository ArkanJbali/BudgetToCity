import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { AlertsService } from '../services/alerts.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FlightPageComponent implements OnInit {
  total = 1;
  responseCheck = false;
  Airports: Airport[] = [];
  myControl = new FormControl();
  myControl2 = new FormControl();
  filteredOptions: Observable<Airport[]>;
  filteredOptions2: Observable<Airport[]>;
  searchFlightForm: FormGroup;
  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private httpClient: HttpClient, private alertService: AlertsService, private toastrService: ToastrService) {

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
    this.searchFlightForm.controls.travelers.setValue(this.total);
 
  }
  onSubmit(newEvent) {
    this.searchFlightForm.controls.fromAirportCode.setValue(this.myControl.value);
    this.searchFlightForm.controls.toAirportCode.setValue(this.myControl2.value);


    if (this.searchFlightForm.valid) {
      console.log("Form Submitted!");
      this.toastrService.success('Success',"Submitted");
      this.searchFlightForm.controls.departDate.setValue(moment(new Date(this.searchFlightForm.controls.departDate.value)).format('YYYY-MM-DD'));
      this.searchFlightForm.controls.returnDate.setValue(moment(new Date(this.searchFlightForm.controls.returnDate.value)).format('YYYY-MM-DD'));
    
      this.getFlights();
    
      console.log(this.searchFlightForm.value);
    }
    else {
      console.log("Form invalid !!!!");
      this.toastrService.error('Error','Should fill all required fields');
    }

   
   
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
        this.searchFlightForm.controls.travelers.setValue(this.total);
      }
  }
  incrementTotal() {
    if (this.total !== 8) {
      this.total = this.total + 1;
      this.searchFlightForm.controls.travelers.setValue(this.total);
    }
  }
  getFlights() {
    var data = null;
    var jsonText = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        
      }
    });
    var from = (this.searchFlightForm.controls.fromAirportCode.value.airportCode) + "-sky";
    var to = (this.searchFlightForm.controls.toAirportCode.value.airportCode) + "-sky";
    var depart = this.searchFlightForm.controls.departDate.value;
    var returns = this.searchFlightForm.controls.returnDate.value;

    xhr.open("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "/" + to + "/" + depart + "?inboundpartialdate=" + returns +"");
    xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f");

    xhr.send(data);
    this.httpClient.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "/" + to + "/" + depart + "?inboundpartialdate=" + returns + "", {
      "headers": {
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
    }
}).subscribe(data => {
  console.log('Inside HTTPClient: ', data);
  //jsonText = JSON.parse(data.toString());
  if (data.hasOwnProperty('Quotes')) {
    console.log('Quotes: ', data['Quotes'])
    console.log('Price: ', data['Quotes'][0]['MinPrice'], "\nDirect? ", data['Quotes'][0]['Direct']);
    //console.log(jsonText.Places[0].IataCode, "-", jsonText.Places[0].Name, "   -  ", jsonText.Places[1].IataCode, "-", jsonText.Places[1].Name);
    //console.log("Carries: ", jsonText.Carriers[0].Name, " - ", jsonText.Carriers[1].Name);
    this.responseCheck = true;
  }
  this.saveResponseTxt(data);
    }, err => {
    console.log('Error Status: ', err.status);
    if (err.status == 400) {
      this.responseCheck = false;
      this.toastrService.error('Error', err.errorMessage);
    }
    });
  }
  saveResponseTxt(str: Object) {
    console.log('Inside Function: ', str);
  }
}

interface Airport {
  airportCode: string;
  airportName: string;
}
