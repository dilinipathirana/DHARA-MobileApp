import { Component,ElementRef, NgZone, ViewChild,CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController,Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import {ApiService} from '../api.service';
import { Places } from '../places';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import {SafeRoutePage} from '../safe-route/safe-route.page'
import {AfterViewInit, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WlpredictService} from '../wlpredict.service';


import { Observable } from 'rxjs';

declare var google: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('mapElement',{ static: true }) mapNativeElement: ElementRef;
  directionForm: FormGroup;

  places:Places;
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
  getplaces:Places;
  currenLocation=[];
  baseUrl:any;
  currentPopover = null;
  source:any;
  destination:any;
  directionsService:any;
  directionsDisplay :any;
  real:any;

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    private apiService: ApiService,
    private http:HTTP,
    private httpClient: HttpClient,
    public popoverController: PopoverController,
    private WlpredictService:WlpredictService,
    private platform:Platform
    
  ) {
    this.directionsService=new google.maps.DirectionsService;
    this.directionsDisplay=new google.maps.DirectionsRenderer;

    this.directionsDisplay.setMap(this.map)

    this.WlpredictService.getData().subscribe(data =>{
  
      console.log(data);
      this.real= data.items[0].value;
    });
    
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
      waterlevel: 0.752,
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

    this.source=this.location;
    this.destination=[];
    // this.ionViewWillEnter();
  }
  
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: SafeRoutePage,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }
  async ngOnInit() {
    await this.platform.ready();
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
       }, 
      //  {
      //   text: 'Flooded',
      //   icon: 'warning',
      //   handler: () => {
      //     console.log('Flooded Location');
      //   }
      // }, 
      {
        text: 'Damaged',
        icon: 'remove-circle',
        handler: () => {
          console.log('Damaged Road');
          this.updateRoadStatus();
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

  updateRoadStatus(){

    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      this.location.lat=pos.lat;
      this.location.lng=pos.lng;

    }).catch((error) => {
      console.log('Error getting location', error);
      // this.loading.dismiss();
    });

    let dstatus={
      'Latitude':this.location.lat,
      'Longitude':this.location.lng,
      'status': 1
    }

    // this.apiService.updateDamageStatus(dstatus).subscribe(response=>{
    //   console.log(response)
    // })
  }
  ionViewWillEnter(){
    console.log("Map Loading Started");
    this.map = new google.maps.Map(document.getElementById('map'),this.mapOptions);
    this.directionsDisplay.setMap(this.map);
    console.log("Loaded");
    var infowindow = new google.maps.InfoWindow({
      content: this.contentString
    });
    let marker = new google.maps.Marker({
      position: this.location,
      map: this.map,
      title: 'I am here!'
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });

    this.WlpredictService.getData().subscribe(data =>{
  
      console.log(data.items[0].value);
      this.real= data.items[0].value;
      console.log(this.real);
    });
  }
  getCurrentLocation(){
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
      this.location.lat=pos.lat;
      this.location.lng=pos.lng;
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
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input},
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          // console.log("++++++++++++++++++++")
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
    if (this.autocomplete.inputDestination == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.inputDestination },
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

  viewSearchDestination(){
  }


//   get_data(){
//       this.apiService.getPlace().subscribe((data:Places)=>this.places={
//         "ID":data["ID"],
//         "Name":data["Name"],
//         "Type":data["Type"],
//         "Longitude ":data["Longitude "],
//         "Latitude ":data["Latitude "],
//         "Evacuation_Centers":data["Evacuation_Centers"]
//       });
// }
  getNearestEvacuationCenter(){

    this.geolocation.getCurrentPosition().then((resp) => {
          this.location.lat=resp.coords.latitude
          this.location.lng=resp.coords.longitude
      });
      console.log(this.location)
      let loc ={

        "start_Latitude":this.location.lat,
        "start_Longitude": this.location.lng
       
       }
       console.log(loc);
      this.apiService.getPlace(loc).subscribe(response=>{
        console.log(response)
      })


     
  }
  

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map=null;
  }


  searchSource(item){
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      
      if(status === 'OK' && results[0]){
        this.source=results[0].geometry.location
        this.map.setCenter(results[0].geometry.location);
      }
    })
  } 

  searchDestination(item){
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.destination=results[0].geometry.location
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }


  findsafestroute(){
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }


  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var loc={
      "src":this.source.ID,
      "dst":this.destination.ID
    }
    var waypts=[]
    this.apiService.getSafeRoute(loc).subscribe(response=>{
      console.log(response)
      var waypts=response;
    })

  //   var waypts =[
  //     {
  //         "ID": 10811,
  //         "Latitude": 6.9462365,
  //         "Longitude":79.8913405
  //     },
  //     {
  //         "ID": 11342,
  //         "Latitude": 6.9440551,
  //         "Longitude": 79.8941083
  //     },
  //     {
  //         "ID": 11851,
  //         "Latitude": 6.9455358,
  //         "Longitude": 79.896933
  //     },
  //     {
  //         "ID": 12345,
  //         "Latitude":6.9425834,
  //         "Longitude": 79.8995129
  //     },
  //     {
  //         "ID": 12851,
  //         "Latitude":6.9428606,
  //         "Longitude": 79.902519
  //     },
  //     {
  //         "ID": 11342,
  //         "Latitude": 6.9440551,
  //         "Longitude": 79.8941083
  //     },
  //     {
  //         "ID": 11851,
  //         "Latitude": 6.9411838,
  //         "Longitude": 79.896933
  //     },
  //     {
  //         "ID": 12345,
  //         "Latitude": 6.9425834,
  //         "Longitude": 79.8995129
  //     },
  //     {
  //         "ID": 12881,
  //         "Latitude": 6.9435767,
  //         "Longitude": 79.9026953
  //     },
  //     {
  //         "ID": 12851,
  //         "Latitude": 6.9428606,
  //         "Longitude": 79.902519
  //     },
  //     {
  //         "ID": 12955,
  //         "Latitude": 6.9428044,
  //         "Longitude": 79.9032748
  //     },
  //     {
  //         "ID": 13238,
  //         "Latitude": 6.9396335,
  //         "Longitude": 79.9050503
  //     }
  // ];

    let pointArray=[]
    
    for (var i = 0; i < waypts.length; i++) {
      console.log("------")
      // console.log(this.geocodeLatLng(this.geocoder,this.map,waypts[i]))
      pointArray.push({
          location: new google.maps.LatLng(waypts[i].Latitude,waypts[i].Longitude),
          stopover: true
        });
     
    }
    console.log(pointArray)
    console.log(this.destination)
    console.log(this.source)
    directionsService.route({
      // origin: this.source,
      origin: new google.maps.LatLng(6.9417913,79.887529),
      // destination: this.destination,
      destination: new google.maps.LatLng(6.9396335,79.9050503),
      waypoints: pointArray,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  geocodeLatLng(geocoder, map,coordination){
    let point;
    let latLng={
      lat:coordination["Latitude"],
      lng:coordination["Longitude"]
    }

    geocoder.geocode({'location': latLng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          point=results[0].formatted_address
          console.log(point)
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
      return latLng;
  }
}
