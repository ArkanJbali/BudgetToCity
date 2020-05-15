import { Component, TemplateRef, OnInit, Inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment/moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class HomeComponent implements OnInit {
  Airports: Airport[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<Airport[]>;
  myControl2 = new FormControl();
  filteredOptions2: Observable<Airport[]>;
  searchBudgetForm: FormGroup;
  sliderValue = 0;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private httpClient: HttpClient, private toastrService: ToastrService, private router: Router) {
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
  
  public modalRef: BsModalRef; // {1}

  ngOnInit() {
    this.searchBudgetForm = new FormGroup({
      fromDestination: new FormControl(),
      toDestination: new FormControl(),
      fromDate: new FormControl(),
      returnDate: new FormControl(),
      budget: new FormControl(),
    });
    this.searchBudgetForm = this.formBuilder.group({
      fromDestination: ['', Validators.required],
      toDestination: ['', Validators.required],
      fromDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      budget: ['', Validators.required]
    });
    
  }
  onSubmit(newEvent) {
    this.searchBudgetForm.controls.fromDestination.setValue(this.myControl.value);
    this.searchBudgetForm.controls.toDestination.setValue(this.myControl2.value);
    this.searchBudgetForm.controls.budget.setValue(this.sliderValue);

    if (this.searchBudgetForm.valid) {
      this.searchBudgetForm.controls.fromDate.setValue(moment(new Date(this.searchBudgetForm.controls.fromDate.value)).format('YYYY-MM-DD'));
      this.searchBudgetForm.controls.returnDate.setValue(moment(new Date(this.searchBudgetForm.controls.returnDate.value)).format('YYYY-MM-DD'));
      console.log(this.searchBudgetForm.value);
    }
    else {
      console.log("Form invalid !!!!");
      this.toastrService.error('Should fill all required fields', 'Error');
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
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }
  valueChanged(e) {
    //console.log('e', parseInt(e));
    this.sliderValue = parseInt(e);
}
}
interface Airport {
  airportCode: string;
  airportName: string;
}
