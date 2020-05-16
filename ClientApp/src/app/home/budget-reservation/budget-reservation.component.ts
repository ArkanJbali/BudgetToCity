import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatStepper, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-budget-reservation',
  templateUrl: './budget-reservation.component.html',
  styleUrls: ['./budget-reservation.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class BudgetReservationComponent implements OnInit {
  //hotels
  userBudget = 0;
  fromDate;
  toDate;
  fromPlace;
  toDestination;

  //flights
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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  hotelsData: HotelCard;
  locationID: number;
  diffInDays: number;
  locationResponseCheck = false;
  hotelResponseCheck = false;

  constructor(public dialogRef: MatDialogRef<BudgetReservationComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, formBuilder: FormBuilder,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private httpClient: HttpClient, private toastrService: ToastrService,
    private router: Router) {
    if (this.data) {
      this.userBudget = this.data['budget'];
      this.fromDate = this.data['fromDate'];
      this.toDate = this.data['returnDate'];
      this.fromPlace = this.data['fromDestination']['airportName'];
      this.toDestination = this.data['toDestination']['airportName'];
      this.diffInDays = Math.abs(moment(this.toDate).diff(moment(new Date(this.fromDate)), 'days'));
      //make loader

      this.getLocationID();

      this.getFlights();
    } else {
      this.onClose();
      this.toastrService.error("Some error occure please insure that you enter correct data.", 'Error');
    }
  }

  ngOnInit() {
    console.log('Inside dialog: ', this.data);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  onClose() {
      this.dialogRef.close();
  }
  getLocationID() {
    var from = this.toDestination;
    this.httpClient.get("https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + from + "", {
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
      }
    }).subscribe(data => {
      console.log('Inside HTTPClient - locations: ', data);
      if (data.hasOwnProperty('data') && Object.keys(data['data']).length > 0) {
        this.locationID = data['data'][0]['result_object']['location_id'];
        this.locationResponseCheck = true;
        if (this.locationResponseCheck) {
          setTimeout(() => {
            this.getHotels();
          }, 2000);
        }
      }
    }, err => {
      console.log('Error Status: ', err.status);
      if (err.status == 400) {
        this.locationResponseCheck = false;
        this.toastrService.error("Error in API get status: " + err.status, 'Error');
      }
    });
  }
  getHotels() {
    var locationId = this.locationID;
    var checkin = this.fromDate;
    var adults = 1;
    var rooms = 1;
    var nights = this.diffInDays;
    this.httpClient.get("https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&checkin=" + checkin + "&order=asc&lang=en_US&sort=recommended&nights=" + nights + "&location_id=" + locationId + "&adults=" + adults + "&rooms=" + rooms + "", {
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
      }
    }).subscribe(data => {
      if (data.hasOwnProperty('data') && Object.keys(data['data']).length > 0) {
        console.log('hotels API work');

        setTimeout(() => {
          this.hotelsData = data['data'];
          this.hotelResponseCheck = true;
          console.log('data length: ', this.hotelsData, '\nResponse:', this.hotelResponseCheck);
        }, 3000);
        //setTimeout(() => {
        // loading part
        //}, 2000);

      }
    }, err => {
      console.log('Error Status: ', err.status);
      if (err.status == 400) {
        this.hotelResponseCheck = false;
        this.toastrService.error("Error in API get status: " + err.status, 'Error');
      }
    });
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
  }
  getFlights() {
    var data = null;
    var from = this.data['fromDestination']['airportCode'] + "-sky";
    var to = this.data['toDestination']['airportCode'] + "-sky";
    var depart = this.fromDate;
    var returns = this.toDate;
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
        console.log("Flights API work");
        setTimeout(() => {
          this.responseCheck = true;
          for (let i = 0; i < this.carriersF.length; i++) {
            this.priceFlightsArr.push(Number(this.priceFlight) + (this.getPlusOrMinus() * this.getRndInteger(50, 150)));
          }
        }, 1000);
        //setTimeout(() => {
        //  //this.scroll();
        //}, 2000);
      }

    }, err => {
      console.log('Error Status: ', err.status);
      if (err.status == 400) {
        this.responseCheck = false;
        this.toastrService.error("Error in API get status: " + err.status, 'Error');
      }
    });
  }
  addFlight(i) {
    console.log("Flight Div: ", i);
  }
}
interface HotelCard {
  hotelName: string;
  hotelRank: string;
  hotelRating: string;
  hotelPrice: string;
  hotelImage: string;
  hotelURL: string;
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

