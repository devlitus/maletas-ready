import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import { WpProvider } from "../../providers/wp/wp";


@IonicPage()
@Component({
  selector: 'page-america',
  templateUrl: 'america.html',
})
export class AmericaPage {
  public contentPage;
  public posts;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _wpService: WpProvider,) {
    
  }

  ionViewDidLoad() {
    this.getPages();
    this.getPostAmerica();
  }
  getPages(){
    let idPage = this.navParams.get('id');
    this._wpService.idPagesAmerica(idPage)
    .then(data => {
      this.contentPage = data['content'].rendered 
      console.log(data['content'].rendered);
    })
    .catch(e => {console.error('fallo get pages id ', e);})
  }
  setPages(data){
    for (const pg of data) {
      if (pg.slug == 'america') {
        console.log(pg.id);
      }
    }
  }
  getPostAmerica(){
    this._wpService.postAmerica()
    .then(data => {
      this.posts = data;
    })
    .catch(e => {console.error('fallo post america ', e);})
  }
  
}
