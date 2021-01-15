import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  chartOption: EChartsOption = {
    title: {
      text: 'CO² Konzentration (ppm)'
    },
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },

    dataZoom: [{
      startValue: 0
    }, {
      type: 'inside'
    }],

    visualMap: {
      top: 10,
      right: 10,
      pieces: [{
        gt: 0,
        lte: 850,
        color: '#096'
      }, {
        gt: 850,
        lte: 1000,
        color: 'orange'
      }, {
        gt: 1000,
        color: 'red',
        // label: 'kritisch (>1000)',
      }],
      outOfRange: {
        color: '#999'
      }
    },
    series: [
      {
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        data: [
          ['2019-10-10', 200],
          ['2019-10-11', 400],
          ['2019-10-12', 650],
          ['2019-10-13', 500],
          ['2019-10-14', 250],
          ['2019-10-15', 300],
          ['2019-10-16', 450],
          ['2019-10-17', 300],
          ['2019-10-18', 100]
        ]
      },
    ],
  };

  constructor(private service: ChartDataService) {
  }

  ngOnInit(): void {
    this.service.getAirQualityData('testdata').subscribe(data => {
      console.log(`Daten: ${data.length}`);
    });
  }

}
