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
  imgURL = "https://material.angular.io/assets/img/examples/shiba2.jpg";
  hotelsData: HotelCard;
  locationID: number;
  diffInDays: number;
  locationResponseCheck = false;
  hotelResponseCheck = false;
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
      City: new FormControl(),
      checkInDate: new FormControl(),
      checkOutDate: new FormControl(),
      Guests: new FormControl(),
      Rooms: new FormControl()

    });
    this.searchHotelForm = this.formBuilder.group({
      City: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      Guests: ['', Validators.required],
      Rooms: ['']
    });
    this.searchHotelForm.controls.Guests.setValue(this.total);

  }
  onSubmit(newEvent) {
    this.searchHotelForm.controls.City.setValue(this.myControl.value.city);

    
    if (this.searchHotelForm.valid) {
      this.getLocationID();
      this.searchHotelForm.controls.checkInDate.setValue(moment(new Date(this.searchHotelForm.controls.checkInDate.value)).format('YYYY-MM-DD'));
      this.searchHotelForm.controls.checkOutDate.setValue(moment(new Date(this.searchHotelForm.controls.checkOutDate.value)).format('YYYY-MM-DD'));
      this.diffInDays = Math.abs(moment(new Date(this.searchHotelForm.controls.checkInDate.value)).diff(moment(new Date(this.searchHotelForm.controls.checkOutDate.value)), 'days'));
      
      
     
      console.log("Form values: ",this.searchHotelForm.value);
    }
    else {
      this.toastrService.error('Should fill all required fields', 'Error');
    }
  }
  private _filter(value: string): IHotel[] {
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
    if (this.hotelResponseCheck) {
      var elmnt = document.getElementById("hotelsList");
      elmnt.scrollIntoView(true);
    }

  }
  getLocationID() {
    var from = (this.searchHotelForm.controls.City.value);
    this.httpClient.get("https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + from + "", {
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
      }
    }).subscribe(data => {
      //console.log('Inside HTTPClient - location: ', data);
      if (data.hasOwnProperty('data') && Object.keys(data['data']).length > 0) {
        this.locationID = data['data'][0]['result_object']['location_id'];
        this.locationResponseCheck = true;
        if (this.locationResponseCheck) {
          setTimeout(() => {
            this.getHotels();
          }, 1500);
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
    var checkin = this.searchHotelForm.controls.checkInDate.value;
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
        this.hotelsData = data['data'];
        //for (var i = 0; i < data['data'].length; i++) {
          //console.log('has data: ', data['data']);
          //console.log('HotelName: ', data['data'][0]['name']);
          //console.log('Image: ', data['data'][0]['photo']['images']['original']['url']);
          //console.log('Ranking: ', data['data'][0]['ranking']);
          //console.log('Rating: ', data['data'][0]['rating']);
          //console.log('Price: ', data['data'][0]['price']);
          //console.log('Hotel Stars: ', data['data'][0]['hotel_class']);
          //console.log('URL: ', data['data'][0]['hac_offers']['offers'][0]['link']);
          console.log('hotels API work');
        //}
        this.hotelResponseCheck = true;
        setTimeout(() => {
          this.scroll();
        }, 1200);

      }
    }, err => {
      console.log('Error Status: ', err.status);
      if (err.status == 400) {
        this.hotelResponseCheck = false;
        this.toastrService.error("Error in API get status: " + err.status, 'Error');
      }
    });
  }
}

interface IHotel {
  Id: string;
  city: string;
}
interface HotelCard {
  hotelName: string;
  hotelRank: string;
  hotelRating: string;
  hotelPrice: string;
  hotelImage: string;
  hotelURL: string;
}
