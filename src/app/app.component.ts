import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//provider
import { WpProvider } from "../providers/wp/wp";

import { HomePage, AsiaPage, AmericaPage, EuropaPage, AfricaPage } from "../app/index-pages";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;
  titlePages: any = [];
  categoria: any = [];
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _wpService: WpProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Asia', component: AsiaPage },
      { title: 'América', component: AmericaPage },
      { title: 'Europa', component: EuropaPage },
      { title: 'Africa', component: AfricaPage }
    ];

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

  openPage(page) {
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  getCategoria() {
    this._wpService.postId(114)
      .then(res => {
        this.setCategoria(res);
      })
      .catch(e => { console.error('Fallo categoria app ', e); })
  }
  setCategoria(res) {
    let cat;
    for (const dato of res) {
      cat = {
        'title': dato.title.rendered,
        'categoria': dato.categories
      }
      this.categoria.push(cat);
    }
    console.log(this.categoria);
    
  }


}
