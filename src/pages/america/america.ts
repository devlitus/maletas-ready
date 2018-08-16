import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
//providers
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";
//page
import { ModalPage } from "../modal/modal";

@IonicPage()
@Component({
  selector: 'page-america',
  templateUrl: 'america.html',
})
export class AmericaPage {
  @ViewChild(Content) Content: Content;
  public posts: any = [];
  public mediaPostAmerica: any = [];
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
    this.getPostAmerica();
  }
  getPostAmerica() {
    this._wpService.postAmerica()
      .then(data => {
        this.setPostAmerica(data);
      })
      .catch(e => { console.error('fallo post asia ', e); })
  }
  setPostAmerica(data) {
    data.filter(e => {
      for (const element of e.categories) {
        if (element === 114) {
          this.posts.push(e);
        }
      }
      
    })
    for (const imag of this.posts) {
      for (const im of imag._links['wp:featuredmedia']) {
        this._wpMediaService.mediaUrl(im.href)
        .subscribe(res => {
          this.detalleMedia(res);
        })
      }
    }
    console.log('posts ', this.posts);
  }
  detalleMedia(data){
    this.mediaPostAmerica.push(data);
    console.log('media ', this.mediaPostAmerica);
    // console.log(data);

  }
  openModal(id){
    const modal = this.modalCtrl.create(ModalPage, {id});
    modal.present(); 
  }
  
}
