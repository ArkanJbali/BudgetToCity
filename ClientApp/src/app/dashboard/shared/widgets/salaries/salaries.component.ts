import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-salaries-widget',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css']
})
export class SalariesComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};

  @Input() data = [];
  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      }, title: {
        text: 'Salaries of Employees by Sector, 2019-2020'
      },

      yAxis: {
        title: {
          text: 'Salaries'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2019 to 2020'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2019
        }
      },

      series: [{
        name: 'Installation',
        data: [43934, 52503]
      }, {
        name: 'Manufacturing',
        data: [24916, 24064]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722]
      }, {
        name: 'Project Development',
        data: [22452, 34400]
      }, {
        name: 'Other',
        data: [null, 5948]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
