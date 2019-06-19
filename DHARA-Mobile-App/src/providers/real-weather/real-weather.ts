import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RealWeatherProvider {
  apiKey =  '3f64d5041d71baf67a34cb7c1b2f580b';
  url;

  
  constructor(public http: Http) {
    // console.log('Hello RealWeatherProvider Provider');
  }
  getWeather(lat, lng){
    this.url = 'https://api.forecast.io/forecast/'+this.apiKey+'/'+lat+','+lng;
    return this.http.get(this.url)
    .map(res => res.json());
    // console.log(lat);
    // console.log(lng);

  }

}
