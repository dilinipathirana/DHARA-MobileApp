import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController,public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
  
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
    let forgot = this.forgotCtrl.create({
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: data => {
          console.log('Send clicked');
          let toast = this.toastCtrl.create({
            message: ' successfully',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        }
      }
    ]
  });
   
  }
  showAlert() {
    const alert = this.forgotCtrl.create({
      title: 'Great!',
      subTitle: 'You have successfully registered with DHARA',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(LoginPage);
  }
}
