import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrototypeApplication';

  aboutURL() {
    window.location.href = 'http://localhost:4200/about';
  }
  flightURL() {
    window.location.href = 'http://localhost:4200/flights';
  }
}
