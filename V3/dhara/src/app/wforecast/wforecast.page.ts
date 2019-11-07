import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-wforecast',
  templateUrl: './wforecast.page.html',
  styleUrls: ['./wforecast.page.scss'],
})
export class WforecastPage implements OnInit {
  forecast:any;
  
  constructor(private fweatherService:WeatherService) { }

  ionViewWillEnter(){
  this.fweatherService.getForecast().subscribe(forecast =>{

    console.log(forecast);
    this.forecast= forecast.DailyForecasts;
  });
}

  ngOnInit() {
  }

}
