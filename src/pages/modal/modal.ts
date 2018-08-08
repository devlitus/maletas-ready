import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public post = [];
  public mediaPost = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private _wpService: WpProvider,
    private _wpMediaService: WpMediaProvider) { }

  ionViewDidLoad() {
    this.getPost();
    // this.posts();
  }
  posts(){ //prueba
    const params = this.navParams.get('id');
    this._wpService.poId(params)
    .then(res => {
      this.setPost(res);
    })
    .catch(e => {console.error('fallo modal ', e);})
    console.log(params);
  }
  getPost(){
    const params = this.navParams.get('id');
    let categorias;
    categorias = {
      'continente': params[0],
      'pais': params[1],
      'ciudad': params[2]
    }
    this._wpService.postId(categorias.pais)
    .then(res => {
      this.setPost(res);
    })
    .catch(e => {console.error('fallo modal post ', e);})
    console.log(params);
  }
  setPost(res){
    let posts;
    for (const r of res) {
      posts = {
        'id': r.id,
        'post': r.posts,
        'title': r.title.rendered,
        'content': r.content.rendered,
        'excerpt': r.excerpt.rendered,
        'featured_media': r.featured_media,
        'categories': r.categories,
        'wp:featuredmedia': r._links['wp:featuredmedia']
      }
      console.log('posts', posts);
      this.getMedia(posts);
      this.post.push(posts);
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
      this._wpMediaService.mediaUrl(element)
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
      'imagen': data.source_url
      /* 'imagenMedium': data.media_details.sizes.medium.source_url,
      'imagenFull': data.media_details.sizes.full.source_url,
      'imagenMedium_large': data.media_details.sizes.medium_large.source_url,
      'imagenThumbnail': data.media_details.sizes.thumbnail.source_url */
    }
    console.log('media', img);
    this.mediaPost.push(img);
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
