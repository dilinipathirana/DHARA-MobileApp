import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MenuPage } from '../pages/menu/menu';
import { ClimatePage } from '../pages/climate/climate';
import { WaterlevelPage } from '../pages/waterlevel/waterlevel';
import { SaferoutePage } from '../pages/saferoute/saferoute';
import { PastfloodPage } from '../pages/pastflood/pastflood';
import { ProfilePage } from '../pages/profile/profile';
import { NotificationPage } from '../pages/notification/notification';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';




import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WeatherProvider } from '../providers/weather/weather';
import { RealWeatherProvider } from '../providers/real-weather/real-weather';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    ClimatePage,
    WaterlevelPage,
    SaferoutePage,
    PastfloodPage,
    HeaderMenuComponent,
    ProfilePage,
    SettingsPage,
    NotificationPage,
    AboutPage

    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      autoFocusAssist: false
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    ClimatePage,
    WaterlevelPage,
    SaferoutePage,
    PastfloodPage,
    ProfilePage,
    SettingsPage,
    NotificationPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    RealWeatherProvider
  ]
})
export class AppModule {}