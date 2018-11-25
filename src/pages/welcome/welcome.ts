import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { SidemenuPage } from '../../pages/sidemenu/sidemenu';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    let user_key = window.localStorage.getItem("token");
    if(user_key)
    {
      this.navCtrl
              .push(SidemenuPage)
              .then(() => {
                // first we find the index of the current view controller:
                const index = this.viewCtrl.index;
                // then we remove it from the navigation stack
                this.navCtrl.remove(index);
              });
    }  }

  Login(){

  }

  Register()
  {
    this.navCtrl.push(RegisterPage);
  }
  

}
