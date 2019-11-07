import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage  {

  weather:any;
  
  

  constructor(private weatherService:WeatherService) { }

  ionViewWillEnter(){
  this.weatherService.getWeather().subscribe(weather =>{

    console.log(weather);
    this.weather= weather[0];
  });
}


  
  ngOnInit() {}
 
  
  

}


