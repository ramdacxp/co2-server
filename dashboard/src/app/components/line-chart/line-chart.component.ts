import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartDataService } from 'src/app/services/chart-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  private _dataSource: string;

  @Input()
  set dataSource(value: string) {
    this._dataSource = value;
    this.updateData();
  }
  get dataSource(): string {
    return this._dataSource;
  }

  chartOption: EChartsOption = {
    title: { text: 'CO² Konzentration (ppm)' },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },

    dataZoom: [
      { startValue: 0 },
      { type: 'inside' }
    ],

    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        return `<b>${params['name']}</b> : ${params['value']}`;
      }
    },

    visualMap: {
      top: 10,
      right: 10,
      pieces: [
        { gt: 0, lte: 850, color: '#096' },
        { gt: 850, lte: 1000, color: 'orange' },
        { gt: 1000, color: 'red' } // label: 'kritisch (>1000)'
      ],
      outOfRange: { color: '#999' }
    },

    series: [{
      type: 'line',
      data: []
    }],
  };

  private _chart: any;

  constructor(private _service: ChartDataService) {
  }

  ngOnInit(): void {
  }

  onChartInit(chart: any) {
    this._chart = chart;
  }

  updateData(): void {
    var subscription = this._service.getAirQualityData(this._dataSource, '2021-01').subscribe(data => {
      console.log(`Loaded ${data.length} records for datasource: ${this._dataSource}`);

      var chartData = [];
      data.forEach(function (value) {
        // console.log(`- ${value.timestamp}: ${value.co2Concentration}, ${value.temperature}`);
        chartData.push([value.timestamp, value.co2Concentration]);
      });

      if (this._chart) {
        this._chart.setOption({
          title: { text: `CO² Konzentration (ppm) - ${this._dataSource}` },
          series: [{
            data: chartData,
            type: 'line'
          }]
        });
      }

      // done
      subscription.unsubscribe();
    });
  }

}
