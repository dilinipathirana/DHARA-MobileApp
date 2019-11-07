import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WlpredictService {

  localUrl;
  dataUrl;
  dataUrl1;
  constructor(public http:Http) { 
    console.log('Hello water level provider');
    this.localUrl='http://127.0.0.1:5001/api';
    this.dataUrl1='http://127.0.0.1:5000/data';
    this.dataUrl='https://environment.data.gov.uk/flood-monitoring/id/stations/1491TH/readings?_sorted&_limit=100';
  
  }

  getWeather(){
    return this.http.get(this.localUrl).pipe(map(res=>res.json()));
  }

  getData(){
    return this.http.get(this.dataUrl).pipe(map(res=>res.json()));
  }
}
