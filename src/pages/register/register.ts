import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Button,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import uuid  from 'uuid/v4';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private RegisterData : FormGroup;
  userData: any;
  response_status: number;
  params: any;
  id_rand:string= uuid();


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private http: HTTP,
    private alertCtrl: AlertController,private facebook: Facebook, private viewCtrl: ViewController,private toastCtrl:ToastController) {

    this.RegisterData = this.formBuilder.group({
      name:['', Validators.required],
      password1: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(20),Validators.pattern('[a-zA-Z 0-9 ]*'), Validators.required])],
      email:['', Validators.email],
      age:['',Validators.required],
      gender:['',Validators.required]
    });

  }

  ionViewDidLoad() {
    
  }

  loginWithFB()
  {
    this.facebook.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {
          id: profile['id']+'a',
          email: profile['email'],
          first_name: profile['first_name'],
          picture: profile['picture_large']['data']['url'],
          username: profile['name']}

         this.params = {
          FullName: this.RegisterData.value.name,
          Password: this.RegisterData.value.password1,
          Email: this.RegisterData.value.email,   
          Latitude: 40,
          Longitude: 21,
          Radius:0,
          Age:this.RegisterData.value.age,
          Gender:this.RegisterData.value.gender,
          Id: this.id_rand,
          ProfilePicture: " "
        }
        this.saveFBdata();
      });
      
      })
  .catch(e => {
    let toast = this.toastCtrl.create({
      message: e,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();  
  }); 

  }

  saveFBdata()
  {
    this.http.post('http://itec-api.deventure.co/api/Account/Register' , this.params, {}).then(data => {

      window.localStorage.setItem("token", JSON.parse(data.data).token);
      window.localStorage.setItem("profile", JSON.parse(data.data).user);
      

      this.navCtrl
        .push(HomePage)
        .then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });
    }).catch(e => {
        let alert = this.alertCtrl.create({
          title: 'You have ann error!',
          subTitle: e.error,
          buttons: ['Dismiss']
        });
        alert.present();
    });
  }

  register()
  {
    let params = {
      FullName: this.RegisterData.value.name,
      Password: this.RegisterData.value.password1,
      Email: this.RegisterData.value.email,   
      Latitude: 40,
      Longitude: 21,
      Radius:0,
      Age:this.RegisterData.value.age,
      Gender:this.RegisterData.value.gender,
      Id: this.id_rand,
      ProfilePicture: " "
    }

    console.log(params);
    

    this.http.post('http://itec-api.deventure.co/api/Account/Register', params, {'Content-Type':'application/json'}).then(data => {
    //  window.localStorage.setItem("token", JSON.parse(data.data).token);
    //  window.localStorage.setItem("profile", JSON.parse(data.data).user);  
     
      let alert= this.alertCtrl.create({
        title:"Data to show",
        subTitle: JSON.stringify(data)
      });
      alert.present();
    this.navCtrl
      .push(HomePage)
      .then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
        
      });
   
    }).catch(e => {
      // let user = JSON.parse(e.error).username ||JSON.parse(e.error).password1 || JSON.parse(e.error).password2 || JSON.parse(e.error).password || JSON.parse(e.error).email;
      // let alert = this.alertCtrl.create({
      //   title: 'Error',
      //   subTitle: user,
      //   buttons: ['Dismiss']
      // });
      // alert.present();  
      console.log(e);
    });

  }
  

  


  

}
