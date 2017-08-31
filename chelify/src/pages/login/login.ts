import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 constructor(public navCtrl: NavController, public androidFingerprintAuth: AndroidFingerprintAuth, private androidPermissions: AndroidPermissions, public modalCtrl: ModalController) {
    
  }
  presentModal() {
    
 this.navCtrl.push(RegisterPage);
  }
example(){
 this.navCtrl.setRoot(HomePage);
/*   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.USE_FINGERPRINT).then(
  success => console.log('Permission granted'),
  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.USE_FINGERPRINT)
);
   this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
               this.navCtrl.setRoot(HomePage);
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
             this.navCtrl.setRoot(HomePage);
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
      this.navCtrl.setRoot(HomePage);
    }
  })
  .catch(error => console.error(error));*/
    }
 

}
