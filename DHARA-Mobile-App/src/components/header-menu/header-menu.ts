import { Component } from '@angular/core';
import { App,MenuController} from 'ionic-angular';
//import { AuthServiceProvider } from '../../providers/auth/auth-service';
import { LoginPage } from '../../pages/login/login';
import { ProfilePage } from '../../pages/profile/profile';
import { NotificationPage } from '../../pages/notification/notification';
import { SettingsPage } from '../../pages/settings/settings';
import { AboutPage } from '../../pages/about/about';

@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {
  constructor(//public authService: AuthServiceProvider,
              public menuCtrl: MenuController,
              public app: App ) {
    console.log('Hello HeaderMenuComponent Component');
  }
  logoutClicked() {
    console.log("Logout");
    //this.authService.logout();
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  profileClicked(){
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.push(ProfilePage);
  }

  notifyClicked(){
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.push(NotificationPage);
  }

  settingsClicked(){
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.push(SettingsPage);
  }

  aboutusClicked(){
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.push(AboutPage);
  }
}