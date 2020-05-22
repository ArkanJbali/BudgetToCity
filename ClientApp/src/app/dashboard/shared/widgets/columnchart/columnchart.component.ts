import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-columnchart-widget',
  templateUrl: './columnchart.component.html',
  styleUrls: ['./columnchart.component.css']
})
export class ColumnchartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};
  //@Input() data = [];

  constructor() { }
 

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Users Book by Regions'
      },
      subtitle: {
        text: 'Source: BudgetToCity.com'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Users'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Asia',
        data: [50, 71, 84, 81, 75, 29, 103, 148, 64, 94, 95, 154]

      }, {
        name: 'Europe',
        data: [43, 82, 95, 74, 52, 85, 105, 44, 92, 83, 106, 92]

      }, {
        name: 'America',
        data: [40, 38, 32, 28, 43, 29, 36, 56, 25, 65, 29, 81]

      }, {
        name: 'Africa',
        data: [32, 45, 41, 51, 41, 75, 40, 27, 47, 49, 31, 51]

      }]
    }
  };
}
