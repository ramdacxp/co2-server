import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataService } from 'src/app/services/chart-data.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  sources: string[] = [];
  selectedSource = '';

  constructor(
    private route: ActivatedRoute,
    private service: ChartDataService) {
  }

  ngOnInit(): void {
    this.service.getDataSources().subscribe(sources => {
      this.sources = sources;
    });

    this.route.queryParams.subscribe(params => {
      this.selectedSource = (!!params.source) ? params.source : '';
      console.log(`Selected: ${this.selectedSource}`);
    });
  }

}

