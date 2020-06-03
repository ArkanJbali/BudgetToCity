import { Component, OnInit } from '@angular/core';
/**
* The About Page
*/
@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}
