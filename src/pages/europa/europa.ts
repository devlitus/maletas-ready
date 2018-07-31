import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from "../../providers/wp/wp";

@IonicPage()
@Component({
  selector: 'page-europa',
  templateUrl: 'europa.html',
})
export class EuropaPage {
  public posts;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _wpService: WpProvider) {
  }

  ionViewDidLoad() {
    this.getPostEuropa();
  }
  getPostEuropa(){
    this._wpService.postEuropa()
    .then(data => {
      this.posts = data;
    })
    .catch(e => {console.error('fallo posts, europa ', e);})
  }

}
