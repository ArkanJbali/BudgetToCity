import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-hotel',
  templateUrl: './dashboard-hotel.component.html',
  styleUrls: ['./dashboard-hotel.component.css']
})
export class DashboardHotelComponent implements OnInit {
  donutChart = [];
  bigChart = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.donutChart = this.dashboardService.donutChart();
    this.bigChart = this.dashboardService.bigChart();
  }

}
