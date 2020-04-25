import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.css']
})
export class FlightPageComponent implements OnInit {
  total = 1;
  Airports: Airport[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Airport[]>(baseUrl + 'api/Airports').subscribe(result => {
      this.Airports = result;
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit() {
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
