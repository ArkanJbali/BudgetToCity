import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment/moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
/**
* The Flights Page
*/
@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FlightPageComponent implements OnInit {
  progress = 0;
  str: string[] = ['Validating your data...', 'Connecting to APIs ...', 'Fetching data...', 'Initializing components...', 'Initialization finish.']
  subtitle: string = '';
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  loaderCheck = false;


  quotesF: Quotes[];
  numberRand: number;
  plusOrMinus: number;
  placesF: Places[];
  carriersF: Carries[];
  total = 1;
  priceFlight: number;
  priceFlightsArr: number[] = [];
  directFlights: boolean;
  responseCheck = false;
  Airports: Airport[] = [];
  myControl = new FormControl();
  myControl2 = new FormControl();
  filteredOptions: Observable<Airport[]>;
  filteredOptions2: Observable<Airport[]>;
  searchFlightForm: FormGroup;
  /**
   * The "constructor"
   * @param formBuilder
   * @param http
   * @param baseUrl
   * @param httpClient
   * @param toastrService
   * @param router
   */
  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private httpClient: HttpClient, private toastrService: ToastrService, private router: Router) {

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
/**
* ngOnInit to initialize all needed parameters
*/
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
    const getDownloadProgress = () => {
      //console.log('getDownload', this);
      if (this.progress <= 99) {
        if (this.progress == 10) {
          this.subtitle = this.str[0];
        }
        if (this.progress == 30) {
          this.subtitle = this.str[1];
        }
        if (this.progress == 50) {
          this.subtitle = this.str[2];
        }
        if (this.progress == 80) {
          this.subtitle = this.str[3];
        }
        if (this.progress == 90) {
          this.subtitle = this.str[4];
        }
        this.progress = this.progress + 1;
      }
      else {
        clearInterval(this.intervalId);
      }
    }
    this.intervalId = setInterval(getDownloadProgress, 200);
  }
/**
* Submit the form to start search for flights
*/
  onSubmit(newEvent) {
    this.searchFlightForm.controls.fromAirportCode.setValue(this.myControl.value);
    this.searchFlightForm.controls.toAirportCode.setValue(this.myControl2.value);


    if (this.searchFlightForm.valid) {
      this.searchFlightForm.controls.departDate.setValue(moment(new Date(this.searchFlightForm.controls.departDate.value)).format('YYYY-MM-DD'));
      this.searchFlightForm.controls.returnDate.setValue(moment(new Date(this.searchFlightForm.controls.returnDate.value)).format('YYYY-MM-DD'));
     // if (!this.responseCheck) {
      //  this.toastrService.warning('There is no matched searches', 'No result');
      //} else {
      this.loaderCheck = true;
      setTimeout(() => {
        
        this.getFlights();
      }, 10000);

      

       
      //}
      console.log(this.searchFlightForm.value);
    }
    else {
      console.log("Form invalid !!!!");
      this.toastrService.error('Should fill all required fields', 'Error');
    }
   
   
  }
  /**
   * To make filtering of __Airports__
   * @param value
   */
  private _filter(value: string): Airport[] {
    const filterValue = value.toLowerCase();
    return this.Airports.filter(option => option.airportName.toLowerCase().indexOf(filterValue) === 0);
  }
  /**
 * Get Date
 */
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
/**
* To Display Cities
* @param airport
*/
  displayFn(airport: Airport): string {
    return airport && airport.airportName ? airport.airportName : '';
  }

  getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlusOrMinus() {
    return  Math.random() < 0.5 ? -1 : 1;
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
/**
 * Get Flights of selected city from __"skyScanner" API__
 */
  getFlights() {
    var from = (this.searchFlightForm.controls.fromAirportCode.value.airportCode) + "-sky";
    var to = (this.searchFlightForm.controls.toAirportCode.value.airportCode) + "-sky";
    var depart = this.searchFlightForm.controls.departDate.value;
    var returns = this.searchFlightForm.controls.returnDate.value;
    this.httpClient.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "/" + to + "/" + depart + "?inboundpartialdate=" + returns + "", {
      "headers": {
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
    }
}).subscribe(data => {
  console.log('Inside HTTPClient: ', data);
  //jsonText = JSON.parse(data.toString());
  if (data.hasOwnProperty('Quotes') && Object.keys(data['Quotes']).length > 0) {
    this.carriersF = data['Carriers'];


    this.quotesF = data['Quotes'];
    this.placesF = data['Places'];
    this.priceFlight = data['Quotes'][0]['MinPrice'];
    this.directFlights = data['Quotes'][0]['Direct'];
    console.log("Carries: ", this.carriersF[0]);
    console.log("Quotes: ", this.quotesF);
    console.log("Places: ", this.placesF);
    //console.log('Quotes: ', data['Quotes'])
    //console.log('Carriers Length: ', Object.keys(data['Carriers']).length);
    //console.log('Price: ', data['Quotes'][0]['MinPrice'], "\nDirect? ", data['Quotes'][0]['Direct']);
    //console.log(jsonText.Places[0].IataCode, "-", jsonText.Places[0].Name, "   -  ", jsonText.Places[1].IataCode, "-", jsonText.Places[1].Name);
    //console.log("Carries: ", jsonText.Carriers[0].Name, " - ", jsonText.Carriers[1].Name);
    setTimeout(() => {
      this.responseCheck = true;
      for (let i = 0; i < this.carriersF.length; i++) {
        this.priceFlightsArr.push(Number(this.priceFlight) + (this.getPlusOrMinus() * this.getRndInteger(50, 150)));
      }
    }, 1000);
    setTimeout(() => {
      this.loaderCheck = false;
      this.scroll();
    }, 2000);
  }
  else {
    setTimeout(() => {
      this.loaderCheck = false;
      this.toastrService.error("Sorry there is no direct flights from: " + this.searchFlightForm.controls.fromAirportCode.value.airportCode + " - to: " + this.searchFlightForm.controls.toAirportCode.value.airportCode, 'No Flights founded!!');
    }, 1000);
  }
    }, err => {
    console.log('Error Status: ', err.status);
    if (err.status) {
      this.loaderCheck = false;
      this.responseCheck = false;
      this.toastrService.error("Error in Flights API connection", 'Error');
    }
    });
  }
  
  scroll() {
    var elmnt = document.getElementById("flightList");
      elmnt.scrollIntoView(true); 
 
  }
  addFlight(i, j) {
    this.toastrService.success("Thank you, your flight " + i.Name + "\nhas ben selected & you will pay : $" + j, "Flight Selected");
    //confirm("You Choosed: " + i.Name + "\n" + "Price: $" + j + "\n Click To Confirm");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}

interface Airport {
  airportCode: string;
  airportName: string;
}

interface Carries {
  CarrierId: number;
  Name: string;
}
interface Places {
  CityId: string;
  CityName: string;
  CountryName: string;
  IataCode: string;
  Name: string;
  PlaceId: number;
  SkyscannerCode: string;
  Type: string;
}
interface Quotes {
  Direct: boolean;
  MinPrice: number;
  OutboundLeg: [];
  QuoteDateTime: string;
  QuoteId: number;
}
