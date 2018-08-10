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
        // console.log("post", posts);
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
    for (let i = 0; i < media.length; i++) {
      const element = media[i];
      this._wpMediaService.mediaUrlAsia(element)
      .subscribe(res => {
        this.detalleMedia(res)
      })
    }
  }
  detalleMedia(data) {
    // console.log("media", data);
    let img = {
      'id': data.id,
      'post': data.post,
      'imagen': data.source_url,
      /* 'imagenMedium': data.media_details.sizes.medium.source_url,
      'imagenFull': data.media_details.sizes.full.source_url,
      'imagenMedium_large': data.media_details.sizes.medium_large.source_url,
      'imagenThumbnail': data.media_details.sizes.thumbnail.source_url */
    }
    this.mediaPostAsia.push(img);
  }
  openModal(id){
    const modal = this.modalCtrl.create(ModalPage, {id});
    modal.present(); 
  }

}
