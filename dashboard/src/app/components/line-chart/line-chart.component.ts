import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartDataService } from 'src/app/services/chart-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  private echartsInstance: any;

  private _dataSource: string;

  @Input()
  set dataSource(value: string) {
    this._dataSource = value;
    this.updateData();
  }
  get dataSource(): string {
    return this._dataSource;
  }

  // @Input() dataSource?: string;

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
          //     ['2019-10-10', 200],
          //     ['2019-10-11', 400],
          //     ['2019-10-12', 650],
          //     ['2019-10-13', 500],
          //     ['2019-10-14', 250],
          //     ['2019-10-15', 300],
          //     ['2019-10-16', 450],
          //     ['2019-10-17', 300],
          //     ['2019-10-18', 100]
        ]
      },
    ],

  };

  constructor(private service: ChartDataService,
    private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  updateData(): void {

    // update
    // if (this.echartsInstance) {
    //   console.log('clear data');
    //   this.echartsInstance.clear();
    //   this.chartOption = {
    //     title: {
    //       text: 'CO² Konzentration (ppm)' + this._dataSource
    //     },
    //     xAxis: {
    //       type: 'category',
    //     },
    //     yAxis: {
    //       type: 'value',
    //     },
    //     series: []
    //   };

    //   }

    // this.chartOption.series = [];
    // this.chartOption.title.text = this._dataSource;


    var subscription = this.service.getAirQualityData(this._dataSource, '2021-01').subscribe(data => {
      console.log(`Loaded ${data.length} records for datasource: ${this._dataSource}`);

      // var co2 = {
      //   type: 'line',
      //   data: []
      // };
      // var temp = {
      //   type: 'line',
      //   data: []
      // };

      var series: any = this.chartOption.series;
      // series[0].data.cl


      data.forEach(function (value) {
        // console.log(`- ${value.timestamp}: ${value.co2Concentration}, ${value.temperature}`);
        series[0].data.push([value.timestamp, value.co2Concentration]);
        console.log(`- ${series[0].data.length}`);
        // co2.data.push([value.timestamp, value.co2Concentration]);
        // temp.data.push([value.timestamp, value.temperature]);
      });

      // this.chartOption = {
      //   title: {
      //     text: 'CO² Konzentration (ppm)' + this._dataSource
      //   },
      //   xAxis: {
      //     type: 'category',
      //   },
      //   yAxis: {
      //     type: 'value',
      //   },
      //   series: []
      // };


      // var series: any = this.chartOption.series;
      // series.push(co2);
      // series.push(temp);


      // if (this.echartsInstance) {
      //   console.log('resize');
      //   this.echartsInstance.resize();
      // }

      // this.changeDetection.detectChanges();


      // done
      subscription.unsubscribe();
    });

  }

}
