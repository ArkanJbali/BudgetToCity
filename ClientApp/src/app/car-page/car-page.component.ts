import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.css']
})
export class CarPageComponent implements OnInit {

  constructor() { }

  progress = 0;
  str: string[] = ['Validating your data...', 'Connecting to Skyscanner API ...', 'Fetching data...', 'Initializing components...', 'Initialization finish.']
  subtitle: string = '';
  visibleOrNot = true;
  progressBar = document.querySelector('.progress-bar');
  intervalId;

  ngOnInit() {
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
        this.visibleOrNot = false;
      }
    }
    this.intervalId = setInterval(getDownloadProgress, 200);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
