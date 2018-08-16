import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
//providers
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";
// page
import { ModalPage } from "../modal/modal";

@IonicPage()
@Component({
  selector: 'page-europa',
  templateUrl: 'europa.html',
})
export class EuropaPage {
  @ViewChild(Content) Content: Content;
  public post: any = [];
  public mediaPostEuropa: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _wpService: WpProvider,
    private _wpMediaService: WpMediaProvider,
    public modalCtrl: ModalController) {

  }
  scrollTop(){
    this.Content.scrollTo(0, 0);
  }
  ionViewDidLoad() {
    this.getPostEuropa();
  }
  getPostEuropa() {
    this._wpService.postEuropa()
      .then(data => {
        this.setPostEuropa(data);
      })
      .catch(e => { console.error('fallo post europa ', e); })
  }
  setPostEuropa(data) {
    data.filter(e => {
      for (const element of e.categories) {
        if (element === 114) {
          this.post.push(e);
        }
      }
      
    })
    for (const imag of this.post) {
      for (const im of imag._links['wp:featuredmedia']) {
        this._wpMediaService.mediaUrl(im.href)
        .subscribe(res => {
          this.detalleMedia(res);
        })
      }
    }
    // console.log('posts ', this.post);
  }
  detalleMedia(data){
    this.mediaPostEuropa.push(data);
    // console.log('media ', this.mediaPostEuropa);
    // console.log(data);

  }
  openModal(id){
    const modal = this.modalCtrl.create(ModalPage, {id});
    modal.present(); 
  }

}
