import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClimatePage } from '../climate/climate';
import { WaterlevelPage } from '../waterlevel/waterlevel';
import { SaferoutePage } from '../saferoute/saferoute';
import { PastfloodPage } from '../pastflood/pastflood';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
  }

  goToClimate(params){
    if (!params) params = {};
    this.navCtrl.push(ClimatePage);
  }

  goToWaterlevel(params){
    if (!params) params = {};
    this.navCtrl.push(WaterlevelPage);
  }

  goToSaferoute(params){
    if (!params) params = {};
    this.navCtrl.push(SaferoutePage);
  }

  goToPastflood(params){
    if (!params) params = {};
    this.navCtrl.push(PastfloodPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
