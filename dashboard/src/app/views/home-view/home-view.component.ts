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
  packages: string[] = [];
  selectedPackage = '';

  constructor(
    private route: ActivatedRoute,
    private service: ChartDataService) {
  }

  ngOnInit(): void {
    this.service.getDataSources().subscribe(sources => {
      this.sources = sources;
    });

    this.route.queryParams.subscribe(params => {
      // source changed?
      if ((!!params.source) && (this.selectedSource !== params.source)) {
        this.selectedSource = params.source;
        console.log(`Changed source to: ${this.selectedSource}`);
        this.loadPackages();
      }

      // package
      if (!!params.package) {
        this.selectedPackage = params.package;
        console.log(`Changed package to: ${this.selectedPackage}`);
      }
    });
  }

  loadPackages(): void {
    this.packages = [];
    this.selectedPackage = '';

    if (!!this.selectedSource) {
      console.log(`Loading packages for: ${this.selectedSource}`);
      var subscripton = this.service.getDataPackages(this.selectedSource).subscribe(packages => {
        this.packages = packages;
        this.selectedPackage = (this.packages.length > 0) ? this.packages[this.packages.length-1] : '';
        subscripton.unsubscribe();
      });
    }
  }

}

