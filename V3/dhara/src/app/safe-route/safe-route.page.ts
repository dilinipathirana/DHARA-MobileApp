import { Component,ElementRef, NgZone, ViewChild,CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-safe-route',
  templateUrl: './safe-route.page.html',
  styleUrls: ['./safe-route.page.scss'],
})
export class SafeRoutePage{

  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;
  location={lat:null,lng:null};
  mapOptions:any;

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
  ) { 
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();

    this.geolocation.getCurrentPosition().then((position)=>{
      this.location.lat=6.937231;
      this.location.lng=79.897247;
      console.log(this.location.lat)
    });
    this.mapOptions={
      center : this.location,
      zoom :15,
      mapTypeId: 'terrain'
    };
  }
  ionViewDidEnter(){
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
  this.map = new google.maps.Map(document.getElementById('map'),this.mapOptions);
}


}
