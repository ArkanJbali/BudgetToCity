import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
* The Hotels Page
*/
@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {
  progress = 0;
  str: string[] = ['Validating your data...', 'Connecting to APIs ...', 'Fetching data...', 'Initializing components...', 'Initialization finish.']
  subtitle: string = '';
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  loaderCheck = false;

  hotelsData: HotelCard;
  locationID: number;
  diffInDays: number;
  locationResponseCheck = false;
  hotelResponseCheck = false;
  totalRooms = 1;
  totalGuest = 1;
  searchHotelForm: FormGroup;
  Hotels: IHotel[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<IHotel[]>;

  firstFormGroup: FormGroup;
  /**
   * The "constructor"
   * @param formBuilder
   * @param _formBuilder
   * @param http
   * @param baseUrl
   * @param httpClient
   * @param toastrService
   * @param router
   */
  constructor(private formBuilder: FormBuilder, private _formBuilder: FormBuilder,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string, private httpClient: HttpClient,
    private toastrService: ToastrService, private router: Router) {
    http.get<IHotel[]>(baseUrl + 'api/Hotels').subscribe(result => {
      this.Hotels = result;

      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => typeof value === 'string' ? value : value.City),
        map(name => name ? this._filter(name) : this.Hotels.slice()));
    }, error => console.error(error));
  }

/**
* ngOnInit to initialize all needed parameters
*/
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
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
      Rooms: ['', Validators.required]
    });
    this.searchHotelForm.controls.Guests.setValue(this.totalGuest);
    this.searchHotelForm.controls.Rooms.setValue(this.totalRooms);
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
* Submit the form to start search for hotels
*/
  onSubmit(newEvent) {
   
    this.hotelResponseCheck = false;
    this.searchHotelForm.controls.City.setValue(this.myControl.value.city);
    if (this.searchHotelForm.valid) {
   
      this.loaderCheck = true;
      setTimeout(() => {

       this.getLocationID();
      }, 5000);

      
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
   * @param hotel
   */
  displayFn(hotel: IHotel): string {
    return hotel && hotel.city ? hotel.city : '';
  }
  decremantTotal() {
    if (this.totalGuest !== 1) {
      this.totalGuest = this.totalGuest - 1;
      this.searchHotelForm.controls.Guests.setValue(this.totalGuest);
    }
  }
  incrementTotal() {
    if (this.totalGuest !== 8) {
      this.totalGuest = this.totalGuest + 1;
      this.searchHotelForm.controls.Guests.setValue(this.totalGuest);
    }
  }
  decremantTotal2() {
    if (this.totalRooms !== 1) {
      this.totalRooms = this.totalRooms - 1;
      this.searchHotelForm.controls.Rooms.setValue(this.totalRooms);
    }
  }
  incrementTotal2() {
    if (this.totalRooms !== 8) {
      this.totalRooms = this.totalRooms + 1;
      this.searchHotelForm.controls.Rooms.setValue(this.totalRooms);
    }
  }
  scroll() {
    if (this.hotelResponseCheck) {
      var elmnt = document.getElementById("hotelsList");
      elmnt.scrollIntoView(true);
    }

  }
  /**
   * Get Location ID of selected city from __"tripAdvisor" API__
   */
  getLocationID() {
    var from = (this.searchHotelForm.controls.City.value);
    this.httpClient.get("https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + from + "", {
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        //"x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
        "x-rapidapi-key": "bd145c28d3msh9e87443c933ee51p1784afjsnd7369dde937d"
        //"x-rapidapi-key": "3297667827msha61217f3d0c09c5p16192djsnb83c2ebd9582"
      }
    }).subscribe(data => {
      //console.log('Inside HTTPClient - location: ', data);
      if (data.hasOwnProperty('data') && Object.keys(data['data']).length > 0) {
        this.locationID = data['data'][0]['result_object']['location_id'];
        this.locationResponseCheck = true;
        if (this.locationResponseCheck) {
          this.getHotels();
        }
      }
    }, err => {
      console.log('Error Status: ', err.status);
      if (err.status == 400) {
        this.locationResponseCheck = false;
        this.toastrService.error("Error in Locations API Connection.", 'Error');
      }
    });
  }
  /**
   * Get All hotels that have the same location ID from __API__
   * */
  getHotels() {
    var locationId = this.locationID;
    var checkin = this.searchHotelForm.controls.checkInDate.value;
    var adults = 1;
    var rooms = 1;
    var nights = this.diffInDays;
    this.httpClient.get("https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&checkin=" + checkin + "&order=asc&lang=en_US&sort=recommended&nights=" + nights + "&location_id=" + locationId + "&adults=" + adults + "&rooms=" + rooms + "", {
      "headers": {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      //"x-rapidapi-key": "df49c2e13emshde8e160f8cf5243p17dec4jsn5aaaec01207f"
        "x-rapidapi-key": "bd145c28d3msh9e87443c933ee51p1784afjsnd7369dde937d"
      //  "x-rapidapi-key": "3297667827msha61217f3d0c09c5p16192djsnb83c2ebd9582"
    }
    }).subscribe(data => {
      if (data.hasOwnProperty('data') && Object.keys(data['data']).length > 0) {


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
        if (!data['data'][0]['hac_offers']['offers'][0]['link']) {
          this.toastrService.error("Sorry there is error occure with Hotels API ", "API Error");
          this.loaderCheck = false;
          this.hotelResponseCheck = false;

        } else {
          setTimeout(() => {
            this.hotelsData = data['data'];
            this.hotelResponseCheck = true;
          }, 1000);
          setTimeout(() => {
            this.loaderCheck = false;
            this.scroll();
          }, 2000);
        }
      }
      else {
        setTimeout(() => {
          this.toastrService.error("Sorry there is no hotels from: " + this.searchHotelForm.controls.checkInDate.value + " - to: " + this.searchHotelForm.controls.checkOutDate.value, 'No Hotels founded!!');
        }, 1000);
      }
    }, err => {
      console.log('Error Status: ', err.status);
        if (err.status) {
        this.loaderCheck = false;
        this.hotelResponseCheck = false;
          this.toastrService.error("Error in Hotels API Connection.", 'Error');
      }
    });
  }
  isCheckedHotel;
  isCheckedHotelName;
  isHotelSelected = false;
/**
* To Make just one selectable hotel
*/
  onChangeHotel(e) {
    this.isCheckedHotelName = e;
    var splitted = this.isCheckedHotelName['price'].split("-");
    var pricePerNight = splitted[1].replace(/[^0-9 ]/g, "");
    this.isCheckedHotel = !this.isCheckedHotel;
    this.isHotelSelected = true;
    console.log(pricePerNight);

  }
/**
* After Select Hotel Print a Message
*/
  onSelectHotel() {
    var splitted = this.isCheckedHotelName['price'].split("-");
    var pricePerNight = splitted[1].replace(/[^0-9 ]/g, "");

    this.toastrService.success("Thank you your hotel has ben selected & you will pay : $" + pricePerNight + " for " + this.diffInDays + " days.", "Hotel Selected");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
