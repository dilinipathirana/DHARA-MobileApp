import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";


@Injectable()
export class WeatherProvider {

  url;
  address = 'Bangalore';
  encodedAddress = encodeURIComponent('Bangalore');

  constructor(public http: Http,
              private storage:Storage) {


           
  
    this.url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.encodedAddress}`;
  }

  getLocation()
  {
    this.storage.get('location').then((val)=>{
      if(val!= null){
        this.encodedAddress = encodeURIComponent(val);
        
      }
      else{
        this.encodedAddress = encodeURIComponent('Bangalore');
        
      }
    });    
    this.url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.encodedAddress;
    console.log('getlocation encoded address is       ',this.encodedAddress);
    return this.http.get(this.url)
    .map(res => res.json());
  }

 
}
