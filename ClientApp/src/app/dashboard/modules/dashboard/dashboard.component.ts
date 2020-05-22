import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../models/Users.model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bigChart = [];
  cards = [];
  pieChart = [];
  users: Users[];
  displayedColumns: string[] = ['Email', 'Phone', 'Permession', 'Role', 'Fname', 'Lname', 'Password', 'isApproved'];
  dataSource = new MatTableDataSource<Users>(this.users);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dashboardService: DashboardService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/Users').subscribe(result => {
      this.users = result as Users[];
      console.log(result);
      this.dataSource = new MatTableDataSource<Users>(this.users);
    }, error => console.log(error));
  }

  ngOnInit() {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.dataSource.paginator = this.paginator;
  }

}
