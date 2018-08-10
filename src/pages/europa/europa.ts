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
    let posts;
    let strTitle;
    for (const d of data) {
      strTitle = d.title.rendered.split(' ');
      if (strTitle[0] == 'Ruta') {
        posts = {
          'id': d.id,
          'post': d.posts,
          'title': d.title.rendered,
          'excerpt': d.excerpt.rendered,
          'featured_media': d.featured_media,
          'categories': d.categories,
          'wp:featuredmedia': d._links['wp:featuredmedia']
        }
        this.post.push(posts);
        this.getMedia(posts);
        console.log("post", posts);
      }
    }
  }
  getMedia(data) {
    let media = [];
    for (const d of data['wp:featuredmedia']) {
      media.push(d.href);
    }
    this.setMediaArray(media);
  }
  setMediaArray(media) {
    for (const key in media) {
      if (media.hasOwnProperty(key)) {
        const element = media[key];
        this._wpMediaService.mediaUrlEuropa(element)
          .subscribe(res => {
            this.detalleMedia(res)
            console.log("media", res);
          })
      }
    }
  }
  detalleMedia(data) {
    let img = {
      'id': data.id,
      'post': data.post,
      'imagen': data.source_url,
      /* 'imagenMedium': data.media_details.sizes.medium.source_url,
      'imagenFull': data.media_details.sizes.full.source_url,
      'imagenMedium_large': data.media_details.sizes.medium_large.source_url,
      'imagenThumbnail': data.media_details.sizes.thumbnail.source_url */
    }
    this.mediaPostEuropa.push(img);
  }
  openModal(id){
    const modal = this.modalCtrl.create(ModalPage, {id});
    modal.present(); 
  }

}
