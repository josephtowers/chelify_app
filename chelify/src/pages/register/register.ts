import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { WelcomePage } from '../../pages/welcome/welcome';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
 constructor(public navCtrl: NavController) {
    
  }
  
  goHome()
  {
  this.navCtrl.setRoot(WelcomePage);
  }
  goBack()
  {
  this.navCtrl.pop()
  }
}
