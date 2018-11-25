
import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {HTTP} from '@ionic-native/http';


declare var google;

/**
 * Generated class for the SidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation, 
    public http:HTTP, public alertCtrl: AlertController,
    public modalCtrl: ModalController) {

  }


  

  ionViewDidLoad(){
    this.loadMap();
  }

  presentProfileModal(issue_details) {
    let profileModal = this.modalCtrl.create('IssueDetailsPage', { Issue: issue_details  });
    profileModal.present();
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      // infoWindow.open(this.map, marker);
      this.presentProfileModal(content);
    });
   
  }

  addMarker(markers){

    let latLng = new google.maps.LatLng(markers.Latitude, markers.Longitude);

 
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
     
     
      this.addInfoWindow(marker, markers );
 
   
 
    
   
  }

  getMarkers(){

    this.http.get('http://itec-api.deventure.co/api/Issue/GetAll', {}, {'Accept': 'application/json'}).then(data=>{

    let markersies = JSON.parse(data.data);
      for(let i=0;i<markersies.length;i++)
      {
          
          this.addMarker(markersies[i]);
      }
     
    });

  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true

      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
     
      let content = "<h4>Your Location!</h4>";         
     
      this.addInfoWindow(marker, content);

      this.getMarkers();

 
    }, (err) => {
      console.log(err);
    });
 

 
  }

}