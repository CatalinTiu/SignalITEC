import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HTTP} from '@ionic-native/http';

/**
 * Generated class for the IssueDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue-details',
  templateUrl: 'issue-details.html',
})
export class IssueDetailsPage {

  public content;
  public title;
  public desc;
  public upvotes;
  public downvotes;
  public comments=[];
  public images=[];
  public upvote_clicked;
  public downvote_clicked;
  public userID;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public http:HTTP) {
    this.content = navParams.get('Issue');
    this.title= this.content.Title;
    this.desc= this.content.Description;
    this.upvotes= this.content.UpVotes;
    this.downvotes= this.content.DownVotes;
    this.comments= this.content.Comments;
    this.images= this.content.Images;
    this.upvote_clicked= false;
    this.downvote_clicked= false;
    this.userID = window.localStorage.getItem("token");

  }

  ionViewDidLoad() {

 }

  Upvote() {

    
    //if (this.upvote_clicked == false) {

      let params={
        IssueId: this.content.Id,
        VoteType: 1
      }

      let header={
        Bearer: this.userID,
      }

      
      this.http.post('http://itec-api.deventure.co/api/Issue/Vote',{params},{header}).then(data=>{
        let alert=this.alertCtrl.create({
          title:"Showing",
          subTitle: data.data
        })
        alert.present();
        
      });
      this.upvote_clicked = true;
   // }

  }

  Downvote() {
   // if (this.downvote_clicked == false) {
      let params={
        IssueId: this.content.Id,
        VoteType: 0
      }
      let header={
        Bearer: this.userID,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

     
      this.http.post('http://itec-api.deventure.co/api/Issue/Vote',{params},{header}).then(data=>{
        let alert=this.alertCtrl.create({
          title:"Showing",
          subTitle: data.data
        })
        alert.present();
      });
      this.downvote_clicked = true;
    }
  //}
}
