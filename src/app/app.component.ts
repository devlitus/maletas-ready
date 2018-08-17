import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//provider
import { WpProvider } from "../providers/wp/wp";
//pages
import { HomePage, ModalPage } from "../app/index-pages";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  pet: string = "Asia";
  isAndroid: boolean = false;
  pages: any = [];
  categoria: any = [];
  mediaPages: any = [];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _wpService: WpProvider,
    public modalCtrl: ModalController) {
    this.initializeApp();
    this.isAndroid = platform.is('android');
    this.getPages();
    this.getCategoria();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getCategoria() {
    this._wpService.categoriasId(114)
      .then(res => {
        this.setCategoria(res);
      })
      .catch(e => { console.error('Fallo categoria app ', e); });
  }
  setCategoria(res) {
    let cat;
    for (const dato of res) {
      cat = {
        'id': dato.id,
        'title': dato.title.rendered,
        'categoria': dato.categories,
        'catId': dato.categories.filter(e => {return e === 59 || e === 58 || e === 57 || e === 60 || e === 102})
      };
      this.categoria.push(cat);
    }
    console.log("categoria", this.categoria);

  }
  getPages() {
    this._wpService.generalPages()
      .then(res => {
        this.setPages(res);
      })
  }
  setPages(res) {
    res.filter(e => {
      if (e.slug === 'asia' || e.slug === 'america' || e.slug === 'europa' || e.slug === 'africa') {
        return this.pages.push(e)
      }
    });
    console.log(this.pages);
  }
  openModal(id){
    let modal = this.modalCtrl.create(ModalPage, {id})
    modal.present();
  }

}
