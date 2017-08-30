import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {


 constructor(public navCtrl: NavController) {
    
  }
  begin()
  {
    
 this.navCtrl.setRoot(HomePage);

  }

}
