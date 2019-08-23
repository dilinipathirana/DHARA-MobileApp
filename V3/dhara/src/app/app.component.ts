import { Component,ViewChild  } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer, from } from 'rxjs';

import { HomePage } from '../app/home/home.page';
import {PastFloodPage} from '../app/past-flood/past-flood.page';
import {WaterLevelPage} from '../app/water-level/water-level.page';
import {WeatherPage} from '../app/weather/weather.page'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  rootPage: any = HomePage;
  showSplash = true;
  pages: Array<{title: string, component: any}>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Past Floods', component: PastFloodPage },
      { title:'Weather', component:WeatherPage},
      {title:'Water Level',component:WaterLevelPage}
    ];
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }

}
