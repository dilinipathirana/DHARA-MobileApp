import { Component,ElementRef, NgZone, ViewChild,CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

declare var google: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
  waterlevel:any;
  contentString:any;
  actionSheet:any;

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController
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
    this.waterlevel=[{
      coordinates:[6.937231,79.897247],
      waterlevel:0.554,
      timestamp: new Date()
        }];

    this.contentString='<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Water Level</h1>'+
    '<div id="bodyContent"><h3>'+
    this.waterlevel[0].waterlevel+' m </h3><br>'+'<b>Flood Status :</b>'+' no flood<br>'+
    '<b>Damage Status</b>'+' no Damage<br>'
    +'</div>'+
    '</div>';
  }
  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'DHARA',
      subHeader: 'Add Status',
      animated: false,
      backdropDismiss: false,
      cssClass: 'my-alert',
      mode: 'md',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Flooded',
        icon: 'warning',
        handler: () => {
          console.log('Flooded Location');
        }
      }, {
        text: 'Damaged',
        icon: 'remove-circle',
        handler: () => {
          console.log('Damaged Road');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  
  ionViewDidEnter(){
      // let infoWindow = new google.maps.InfoWindow({map: map});
      //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'),this.mapOptions);
  }

  

  getCurrentLocation(){
    // this.loading= this.loadingCtrl.create({
    //   // content: 'Please wait...'
    // })
    // this.loading.present();
    this.clearMarkers();//remove previous markers

    var infowindow = new google.maps.InfoWindow({
      content: this.contentString
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'I am here!'
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });

      this.markers.push(marker);
      this.map.setCenter(pos);
      // this.loading.dismiss();
      this.loading=null;

    }).catch((error) => {
      console.log('Error getting location', error);
      // this.loading.dismiss();
      
    });
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };

        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });

        var infowindow = new google.maps.InfoWindow({
          content: this.contentString
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  } 

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  viewfloodstatus(waterlevel){
    console.log("View Flood Status")
    var heatmapData=[];
    var elevator = new google.maps.ElevationService;
    var infowindow = new google.maps.InfoWindow({map: this.map});
    
     for(var i=0;i<waterlevel.length;i++){
        
        var coords=waterlevel[i].coordinates;
        console.log(coords[1])
        var latLng=new google.maps.LatLng(coords[1],coords[0]);
        heatmapData.push(latLng)
     }

     var heatmap=new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: this.map
    });
  }

  refreshmap(){
    console.log("Refresh Map");

    this.viewfloodstatus(this.waterlevel);
  }
  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

}
