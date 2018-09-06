import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content  } from 'ionic-angular';
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  @ViewChild(Content) Content: Content;
  postAsia: any = [];
  postAmerica: any = [];
  postAfrica: any = [];
  postEuropa: any = [];
  postMedia: any = [];
  titulo: string="";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private _wpService: WpProvider,
    private _wpMediaService: WpMediaProvider) { }

  ionViewDidLoad() {
    this.getPost();
  }
  scrollTop(){
    this.Content.scrollTo(0, 0);
  }
  getPost(){
    const paramsId = this.navParams.get('id');
    paramsId.find(e => {
      if (e == 57) {
        this.getPostAsia();
      }
    });
    paramsId.find(e => {
      if (e == 58) {
        this.getPostAmerica();
      }
    });
    paramsId.find(e => {
      if (e == 60) {
        this.getPostEuropa();
      }
    });
    paramsId.find(e => {
      if (e == 59) {
        this.getPostEuropa();
      }
    });
    
  }

  getPostAsia(){
    const paramsId = this.navParams.get('id');
    const paramsTitulo = this.navParams.get('titulo');
    this.titulo = paramsTitulo;
    console.log('params asia', paramsTitulo);
    let temp = paramsId.filter(e => {
      if ((e !== 114) && (e !== 57)) {
        return e
      }
    })
    this.recuperacion(temp);
  }
  getPostAmerica(){
    const params = this.navParams.get('id');
    const paramsTitulo = this.navParams.get('titulo');
    this.titulo = paramsTitulo;
    console.log('params america', paramsTitulo);
    let temp = params.filter(e => {
      if ((e !== 114) && (e !== 58)) {
        return e
      }
    })
    this.recuperacion(temp);
  }
  
  getPostEuropa(){
    const params = this.navParams.get('id');
    const paramsTitulo = this.navParams.get('titulo');
    this.titulo = paramsTitulo;
    console.log('params europa', params);
    let temp = params.filter(e => {
      if ((e !== 114) && (e !== 60)) {
        return e;
      }
    })
    this.recuperacion(temp);
    // console.log(Object.keys(temp).length);
  }
  private recuperacion(temp: any) {
    if (Object.keys(temp).length == 2) {
      let id = Math.min(temp[0], temp[1]);
      this._wpService.categoriasId(id)
        .then(res => {
          this.postEuropa.push(res);
          this.setMedia(res);
          console.log(res);
        });
    }
    else {
      this._wpService.categoriasId(temp)
        .then(res => {
          this.postEuropa.push(res);
          this.setMedia(res);
        });
    }
  }

  setMedia(data){
    for (const dat of data) {
      for (const d of dat._links['wp:featuredmedia']) {
        this._wpMediaService.mediaUrl(d.href)
        .subscribe(res => {
          this.postMedia.push(res);
          console.log(res['id']);
        })
      }
    }
    
  }
  getPostAfrica(){
    const params = this.navParams.get('id');
    console.log('params africa', params);
    params.filter(e => {
      if ((e !== 114) && (e !== 59)) {
        this._wpService.categoriasId(e)
        .then(res => {
          this.postAfrica.push(res);
          console.log(res);
        })
      }
    })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
