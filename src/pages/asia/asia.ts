import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Content,
  FabContainer
} from "ionic-angular";
//providers
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";
import { SocialSharing } from "@ionic-native/social-sharing";
//pages
import { ModalPage } from "../modal/modal";

@IonicPage()
@Component({
  selector: "page-asia",
  templateUrl: "asia.html"
})
export class AsiaPage {
  @ViewChild(Content)
  Content: Content;
  @ViewChild("titulo")
  titulo: ElementRef;
  public post: any[] = [];
  public mediaPostAsia: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _wpService: WpProvider,
    private _wpMediaService: WpMediaProvider,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing
  ) {}
  scrollTop() {
    this.Content.scrollTo(0, 0);
  }
  ionViewDidLoad() {
    this.getPostAsia();
  }

  getPostAsia(): void {
    this._wpService
      .postAsia()
      .then(data => {
        this.setPostAsia(data);
      })
      .catch(e => {
        console.error("fallo post asia ", e);
      });
  }
  setPostAsia(data): void {
    data.filter(e => {
      for (const element of e.categories) {
        if (element === 114) {
          this.post.push(e);
        }
      }
    });
    for (const imag of this.post) {
      for (const im of imag._links["wp:featuredmedia"]) {
        this._wpMediaService.mediaUrl(im.href).subscribe(res => {
          this.detalleMedia(res);
        });
      }
    }
    // console.log('posts ', this.post);
  }
  detalleMedia(data: Object) {
    this.mediaPostAsia.push(data);
    // console.log('media ', this.mediaPostAsia);
    // console.log(data);
  }

  openModal(id: string, titulo: string) {
    const modal = this.modalCtrl.create(ModalPage, { id, titulo });
    modal.present();
  }

  openSocial(network: string, fab: FabContainer, post: any) {
    switch (network) {
      case "facebook":
        this.socialSharing
          .shareViaFacebook(post, "imagen")
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
        .shareViaTwitter(post, "imagen")
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
          .shareViaWhatsApp(post, "imagen")
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
    /* this.socialSharing
      .shareViaFacebook("mensaje", "imagen")
      .then(() => {
        // Success!
      })
      .catch(() => {
        // Error!
      }); */
    fab.close();
  }
}
