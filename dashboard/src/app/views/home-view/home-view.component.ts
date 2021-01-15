import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  sources: string[] = ['testdata', 'sensor', 'zwei', 'drei', 'vier', 'fünf', 'sechs'];
  selectedSource = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedSource = (!!params.source) ? params.source : '';
    });
  }

}

