import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AirQuality } from '../models/air-quality';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private apiUrl = `${environment.apiRoot}/AirQuality`;

  constructor(private httpClient: HttpClient) {
    console.log(`Data Service API: ${this.apiUrl}`);
  }

  getDataSources(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}`);
  }

  getDataPackages(dataSource: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/${dataSource}`);
  }

  getAirQualityData(dataSource: string, dataPackage: string): Observable<AirQuality[]> {
    return this.httpClient.get<AirQuality[]>(`${this.apiUrl}/${dataSource}/${dataPackage}`);
  }
}
