import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CarsService } from '../services/cars.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
/**
* The Cars Page
*/
@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.css']
})
export class CarPageComponent implements OnInit {
  progress = 0;
  str: string[] = ['Validating your data...', 'Connecting to APIs ...', 'Fetching data...', 'Initializing components...', 'Initialization finish.']
  subtitle: string = '';
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  loaderCheck = false;

  carsData: Cars[];
  locationID: number;
  diffInDays: number;
  carResponseCheck = false;
  total = 1;
  searchCarForm: FormGroup;
  Cars: ICars[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<ICars[]>;

  firstFormGroup: FormGroup;

  displayedColumns: string[] = [/*'ID', */'Manufacturer', 'Model', 'Category', 'Year', 'Gear Box', 'Doors', 'Fuel Type', 'Color', 'Price', 's'];
  dataSource = new MatTableDataSource<Cars>(this.carsData);
/**
  * The data-binding value of the ViewChild, added on enter to the paginator
  */
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * The "constructor"
   * @param formBuilder
   * @param _formBuilder
   * @param http
   * @param baseUrl
   * @param httpClient
   * @param toastrService
   * @param router
   * @param carsService
   */
  constructor(private formBuilder: FormBuilder, private _formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private httpClient: HttpClient, private toastrService: ToastrService, private router: Router,
    private carsService: CarsService) {
    http.get<ICars[]>(baseUrl + 'api/Hotels').subscribe(result => {
      this.Cars = result;
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => typeof value === 'string' ? value : value.City),
        map(name => name ? this._filter(name) : this.Cars.slice()));
    }, error => console.error(error));
    this.getCars();
  }
/**
* ngOnInit to initialize all needed parameters
*/
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    //setTimeout(() => this.dataSource.paginator = this.paginator);

    this.searchCarForm = new FormGroup({
      City: new FormControl(),
      checkInDate: new FormControl(),
      checkOutDate: new FormControl(),
      Passangers: new FormControl()

    });
    this.searchCarForm = this.formBuilder.group({
      City: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      Passangers: ['', Validators.required]
    });
    this.searchCarForm.controls.Passangers.setValue(this.total);
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
* Submit the form to start search for cars
*/
  onSubmit(newEvent) {
    this.searchCarForm.controls.City.setValue(this.myControl.value.city);
    this.carResponseCheck = false;

    if (this.searchCarForm.valid) {
      this.loaderCheck = true;
      this.carResponseCheck = true;
      this.getCars();
      setTimeout(() => {
        this.scroll();
        this.loaderCheck = false;

      }, 5000);
    
        
     
      this.searchCarForm.controls.checkInDate.setValue(moment(new Date(this.searchCarForm.controls.checkInDate.value)).format('YYYY-MM-DD'));
      this.searchCarForm.controls.checkOutDate.setValue(moment(new Date(this.searchCarForm.controls.checkOutDate.value)).format('YYYY-MM-DD'));
      this.diffInDays = Math.abs(moment(new Date(this.searchCarForm.controls.checkInDate.value)).diff(moment(new Date(this.searchCarForm.controls.checkOutDate.value)), 'days'));
      console.log("Form values: ", this.searchCarForm.value);
    }
    else {
      this.toastrService.error('Should fill all required fields', 'Error');
    }

  }
/**
* To make filtering of __Cities__
* @param value
*/
  private _filter(value: string): ICars[] {
    const filterValue = value.toLowerCase();
    return this.Cars.filter(option => option.city.toLowerCase().indexOf(filterValue) === 0);
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
* To Display Cars
* @param car
*/
  displayFn(car: ICars): string {
    return car && car.city ? car.city : '';
  }
  decremantTotal() {
    if (this.total !== 1) {
      this.total = this.total - 1;
      this.searchCarForm.controls.Passangers.setValue(this.total);
    }
  }
  incrementTotal() {
    if (this.total !== 7) {
      this.total = this.total + 1;
      this.searchCarForm.controls.Passangers.setValue(this.total);
    }
  }
  scroll() {
    if (this.carResponseCheck) {
      var elmnt = document.getElementById("carsList");
      elmnt.scrollIntoView(true);
    }
  }
/**
* Get Cars of selected city from __"tripAdvisor" API__
*/
  getCars() {
    this.carsService.getCars()
      .subscribe(data => {
        this.carsData = data;


        let minI = this.getRandomNumberBetween();
        let maxI = this.getRandomNumberBetween();
        console.log(maxI, minI);
        this.dataSource = new MatTableDataSource<Cars>(this.carsData.slice(Math.min(minI, maxI), Math.max(minI, maxI)));
        this.dataSource.paginator = this.paginator;
        if (this.carsData.slice(Math.min(minI, maxI), Math.max(minI, maxI)).length == 0) {
          this.toastrService.error('Sorry there are no cars available in these days.', 'Not found!');
        }
      }, error => this.toastrService.error('Error in connection please try agian.', 'Error get post list'));
  }
  isCheckedCar;
  isCheckedCarName;
  isCarSelected = false;
/**
* To Make just one selectable car
*/
  onChangeCar(e) {
    this.isCheckedCarName = e;
    this.isCheckedCar = !this.isCheckedCar;
    this.isCarSelected = true;

  }
/**
* After Select Car Print a Message
*/
  selectCar() {
    let element = this.isCheckedCarName;
    this.toastrService.success("You'll pay for " + this.diffInDays + " days: $" + (this.diffInDays * Number(element.price)), "Car Selected");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  getRandomNumberBetween() {
    return Math.floor(Math.random() * (this.carsData.length - 20) + 5);
  }
}
