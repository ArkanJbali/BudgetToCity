import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  chartOptions: {};
  @Input() data: any = [];

  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Historic and Estimated Website\'s Users Visits by Region'
      },
      subtitle: {
        text: 'Source: BudgeToCity.com'
      },
      xAxis: {
        categories: ['1/2020', '2/2020', '3/2020', '4/2020', '5/2020', '6/2020', '7/2020', '8/2020', '9/2020', '10/2020', '11/2020', '12/2020'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: 'Number of Visits'
        },
        labels: {
          formatter: function () {
            return this.value;
          }
        }
      },
      tooltip: {
        split: true,
        valueSuffix: ' users'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      exporting: {
      enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268, 304, 1223, 507, 4100, 3900]
      }, {
        name: 'Africa',
          data: [106, 107, 111, 133, 221, 767, 1766, 1304, 223, 507, 1450, 983]
      }, {
        name: 'Europe',
          data: [163, 203, 276, 408, 547, 729, 628, 234, 623, 527, 512, 4441]
      }, {
        name: 'America',
          data: [18, 31, 54, 156, 339, 818, 1201, 304, 123, 307, 2099, 300]
      }, {
        name: 'Oceania',
          data: [2, 2, 2, 6, 13, 30, 46, 51, 3, 23, 21, 18]
      }]
    }

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
  }

