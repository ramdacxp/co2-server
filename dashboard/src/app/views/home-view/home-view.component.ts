import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  selectedSource = '';

  sources: DataSource[] = [
    { name: 'eins', value: 100 },
    { name: 'zwei', value: 200 },
    { name: 'drei', value: 1300 },
    { name: 'vier', value: 4000 },
    { name: 'fünf', value: 500 },
    { name: 'sechs', value: 1600 },
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedSource = (!!params.source) ? params.source : '';
    });
  }

}

class DataSource {
  name: string;
  value: number;
}