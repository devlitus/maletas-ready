import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from "../../providers/wp/wp";

@IonicPage()
@Component({
  selector: 'page-africa',
  templateUrl: 'africa.html',
})
export class AfricaPage {
  public posts;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _wpService: WpProvider) {

  }

  ionViewDidLoad() {
    this.getPostAfrica();
  }

  getPostAfrica(){
    this._wpService.postAfrica()
    .then(data => {
      this.posts = data;
      console.log(this.posts);
    })
    .catch(e => {console.error('fallo post africa ', e);})
  }

}
