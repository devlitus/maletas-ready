import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";

@IonicPage()
@Component({
  selector: 'page-africa',
  templateUrl: 'africa.html',
})
export class AfricaPage {
  public post: any = [];
  public mediaPostAfrica: any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _wpService: WpProvider, 
    private _wpMediaService: WpMediaProvider) {
    
  }

  ionViewDidLoad() {
    this.getPostAfrica();
  }
  getPostAfrica(){
    this._wpService.postAfrica()
    .then(data => {
      this.post = data;
      console.log(this.post);
      this.getMedia(data);
    })
    .catch(e => {console.error('fallo post asia ', e);})
  }
  getMedia(data){
    let media =[];
    for (const d of data) {
      for (const w of d._links['wp:featuredmedia']) {
        media.push(w.href);
      }
    }
    this.setMediaArray(media);
  }
  setMediaArray(media){
    for (let i = 0; i < media.length; i++) {
      const element = media[i];
      this._wpMediaService.mediaUrlAfrica(element)
      .subscribe(res => {
        this.detalleMedia(res)
      })
    }
  }
  detalleMedia(data){
    console.log(data);
    let img = {
      'post': data.post,
      'imagen': data.source_url,
      /* 'imagenMedium': data.media_details.sizes.medium.source_url,
      'imagenFull': data.media_details.sizes.full.source_url,
      'imagenMedium_large': data.media_details.sizes.medium_large.source_url,
      'imagenThumbnail': data.media_details.sizes.thumbnail.source_url */
    }
    this.mediaPostAfrica.push(img);
  }


}
