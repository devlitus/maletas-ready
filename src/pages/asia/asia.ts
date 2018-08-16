import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content  } from 'ionic-angular';
//providers
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";
//pages
import { ModalPage } from "../modal/modal";

@IonicPage()
@Component({
  selector: 'page-asia',
  templateUrl: 'asia.html',
})
export class AsiaPage {
  @ViewChild(Content) Content: Content;
  public post: any = [];
  public mediaPostAsia: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _wpService: WpProvider,
    private _wpMediaService: WpMediaProvider,
    private modalCtrl: ModalController
  ) { }
  scrollTop(){
    this.Content.scrollTo(0, 0);
  }
  ionViewDidLoad() {
    this.getPostAsia();
  }
  getPostAsia() {
    this._wpService.postAsia()
    .then(data => {
      this.setPostAsia(data);
    })
    .catch(e => { console.error('fallo post asia ', e); })
  }
  setPostAsia(data) {
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
    this.mediaPostAsia.push(data);
    // console.log('media ', this.mediaPostAsia);
    // console.log(data);
  }
  openModal(id){
    const modal = this.modalCtrl.create(ModalPage, {id});
    modal.present(); 
  }

}
