import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';
//providers
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";
import { SocialSharing } from "@ionic-native/social-sharing";

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
    private _wpMediaService: WpMediaProvider,
    private socialSharing: SocialSharing) {

  }

  ionViewDidLoad() {
    this.getPostAfrica();
  }
  getPostAfrica() {
    this._wpService.postAfrica()
      .then(data => {
        this.post = data;
        this.getMedia(data);
      })
      .catch(e => { console.error('fallo post asia ', e); })
  }
  getMedia(data) {
    let media = [];
    for (const d of data) {
      for (const w of d._links['wp:featuredmedia']) {
        media.push(w.href);
      }
    }
    this.setMediaArray(media);
  }
  setMediaArray(media) {
    for (let i = 0; i < media.length; i++) {
      const element = media[i];
      this._wpMediaService.mediaUrlAfrica(element)
        .subscribe(res => {
          this.detalleMedia(res)
        })
    }
  }
  detalleMedia(data) {
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
  openSocial(network: string, post: any, imagen: any, fab: FabContainer) {
    switch (network) {
      case "facebook":
        this.socialSharing
          .shareViaFacebook(post.title.rendered, imagen, post.link)
          .then(() => {
            // Success!
            console.log("Share in " + network);
          })
          .catch(() => {
            // Error!
            console.error("No se puede compartir");
          });

        break;
      case "twitter":
        this.socialSharing
          .shareViaTwitter(post.title.rendered, imagen, post.link)
          .then(() => {
            console.log("Share in " + network);
            // Success!
          })
          .catch(() => {
            // Error!
            console.error("No se puede compartir");
          });
        break;
      case "whatsapp":
        this.socialSharing
          .shareViaWhatsApp(post.title.rendered, imagen, post.link)
          .then(() => {
            console.log("Share in " + network);
            // Success!
          })
          .catch(() => {
            // Error!
            console.error("No se puede compartir");
          });
        break;
      default:
        break;
    }

    fab.close();
  }


}
