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
  progress = 0;
  str: string[] = ['Validating your data...', 'Connecting to APIs ...', 'Fetching data...', 'Initializing components...', 'Initialization finish.']
  subtitle: string = '';
  progressBar = document.querySelector('.progress-bar');
  intervalId;

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

  quotesF2: Quotes[];
  placesF2: Places[];
  carriersF2: Carries[];

  total = 1;
  priceFlight: number;
  flightsData;
  //---------------------------------
  priceFlightsArr: number[] = [];
  flightsArrData: any = [];
  directFlights: boolean;
  responseCheck = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //----------------------------------
  hotelsData: HotelCard;
  locationID: number;
  diffInDays: number;
  locationResponseCheck = false;
  hotelResponseCheck = false;
  tempArr = [0, 0];
  totalBudget;

  constructor(public dialogRef: MatDialogRef<BudgetReservationComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, formBuilder: FormBuilder,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private httpClient: HttpClient, private toastrService: ToastrService,
    private router: Router) {
    if (this.data) {
      this.userBudget = this.data['budget'];
      this.totalBudget = this.userBudget;
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
        if (this.progress == 95) {
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
      //console.log('Inside HTTPClient - locations: ', data);
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
          //console.log('data length: ', this.hotelsData, '\nResponse:', this.hotelResponseCheck);
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
      this.flightsData = data;
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
  isCheckedHotel;
  isCheckedHotelName;
  isHotelSelected = false;

  onChangeHotel(e) {
    this.tempArr[0] = 0;
    this.totalBudget = this.userBudget - this.tempArr[0] - this.tempArr[1];
    this.isCheckedHotelName = e;
    console.log(this.isCheckedHotelName);
    //if (this.isCheckedHotelName != null && this.isHotelSelected == false) {
      var splitted = this.isCheckedHotelName['price'].split("-");
      var pricePerNight = splitted[1].replace(/[^0-9 ]/g, "");
    console.log(pricePerNight);
    //}
    if (pricePerNight > this.totalBudget) {
      this.toastrService.warning("You can't choose over budget", 'Budget limit!');
      //this.isHotelSelected = false;
      this.isCheckedHotel = !this.isCheckedHotel;
      return;
    } else {
      this.tempArr[0] = pricePerNight;
      this.isHotelSelected = true;
      if ((this.userBudget - this.tempArr[0] - this.tempArr[1]) <= this.userBudget && (this.userBudget - this.tempArr[0] - this.tempArr[1]) > 0) {
        this.totalBudget = this.userBudget - this.tempArr[0] - this.tempArr[1];
        this.isCheckedHotel = !this.isCheckedHotel;
      }
    }
    //if (this.totalBudget <= this.userBudget && this.totalBudget > 0) {
    //  this.totalBudget = this.userBudget - this.tempArr[0] - this.tempArr[1];

    //} else {
    //  this.totalBudget = this.userBudget + this.tempArr[0] - this.tempArr[1];
    //  //this.toastrService.warning("You can't choose over budget", 'Budget limit!');
    //}
    
  }
  isCheckedFlight;
  isCheckedFlightName;
  isFlightSelected = false;
  isFlightPriceSelected;

  onChangeFlight(e, price) {
    this.tempArr[1] = 0;
    this.totalBudget = this.userBudget - this.tempArr[0] - this.tempArr[1];
    this.isCheckedFlightName = e;
    this.isFlightPriceSelected = price;
    
    if (this.isFlightPriceSelected > this.totalBudget) {
      this.isCheckedFlight = !this.isCheckedFlight;
      //this.isFlightSelected = false;
      this.toastrService.warning("You can't choose over budget", 'Budget limit!');
      return;
    } else {
      
      this.tempArr[1] = this.isFlightPriceSelected;
      this.isFlightSelected = true;
      if ((this.userBudget - this.tempArr[0] - this.tempArr[1]) <= this.userBudget && (this.userBudget - this.tempArr[0] - this.tempArr[1]) > 0) {
        this.totalBudget = this.userBudget - this.tempArr[0] - this.tempArr[1];
        this.isCheckedFlight = !this.isCheckedFlight;
      }
    }
    //if (this.totalBudget <= this.userBudget && this.totalBudget > 0) {
    //  this.totalBudget = this.userBudget - this.tempArr[0] - this.tempArr[1];

    //} else {
    //  this.totalBudget = this.userBudget - this.tempArr[0] + this.tempArr[1];
    //  //this.toastrService.warning("You can't choose over budget", 'Budget limit!');
    //}
    //console.log(this.isCheckedFlightName);
  }
  isDoneCanFetch = false;
  addHotel() {
    //console.log("Hotel Div: ", h);
    
    if (this.isCheckedFlightName != null && this.isFlightSelected == true) {
      this.flightsArrData.push(this.flightsData['Carriers'][this.isCheckedFlightName]);
      this.flightsArrData.push(this.flightsData['Places']);
      this.flightsArrData.push(this.flightsData['Quotes'][0]);
      this.carriersF2 = this.flightsArrData[0];
      this.quotesF2 = this.flightsArrData[2];
      this.placesF2 = this.flightsArrData[1];
      console.log(this.flightsArrData);
      //this.userBudget -= this.isFlightPriceSelected;
      //this.isFlightSelected = true;
    }
    if (this.isFlightSelected == true && this.isHotelSelected == true) {
      this.isDoneCanFetch = true;
    }
  }
  //findBudget() {
  //  let hotelPrices = Math.max.apply(Math, this.hotelsData['price'].map(function (o) { return o; }));
  //  console.log('Hotel Min price: ', hotelPrices);
  //  let flightPrices = Math.max.apply(Math, this.priceFlightsArr.map(function (o) { return o; }));
  //  console.log('Flight Min price: ', flightPrices);
  //}
  doneReservation() {
    let s: number;
    s = Number(this.tempArr[0]) + Number(this.tempArr[1]);
    this.toastrService.success("Reservation request send you paid: $" + s);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
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

