import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {WlpredictService} from '../wlpredict.service';

@Component({
  selector: 'app-water-level',
  templateUrl: './water-level.page.html',
  styleUrls: ['./water-level.page.scss'],
})
export class WaterLevelPage implements OnInit {

  waterLevel:any;
  data:any;

  constructor(public alertController: AlertController,private WlpredictService:WlpredictService) { }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'No alerts at this moment',
      buttons: ['OK']
    });

    await alert.present();
  }

  async DangerAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'There\'s a possible flood danger in your area. Keep on alert!  ',
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewWillEnter(){
    // this.WlpredictService.getWeather().subscribe(waterLevel =>{
  
    //   console.log(waterLevel);
    //   this.waterLevel= waterLevel[0];
    // });
    this.waterLevel=2.15
    this.WlpredictService.getData().subscribe(data =>{
  
      console.log(data);
      this.data= data;
    });
  }

  ngOnInit() {
  }

}
