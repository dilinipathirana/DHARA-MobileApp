import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url2;
  url;

  constructor(public http:Http) { 
    console.log('Hello weather provider');
    this.url='http://dataservice.accuweather.com/currentconditions/v1/311399?apikey=dCA5gyFDiTOr8Y7D6dGf8WYa3BHfrnkP&language=en-us&details=true';
    this.url2='http://dataservice.accuweather.com/forecasts/v1/daily/5day/311399?apikey=dCA5gyFDiTOr8Y7D6dGf8WYa3BHfrnkP&language=en-us&details=true&metric=true';
  }

  getWeather(){
    return this.http.get(this.url).pipe(map(res=>res.json()));
  }

  getForecast(){
    return this.http.get(this.url2).pipe(map(res=>res.json()));
  }
}
