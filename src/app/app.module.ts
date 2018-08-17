import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PipesModule } from "../pipes/pipes.module";
//pages
import {
  MyApp,
  HomePage,
  AmericaPage,
  AsiaPage,
  EuropaPage,
  AfricaPage,
  ModalPage
} from "./index-pages";
//providers
import { WpProvider } from '../providers/wp/wp';
import { WpMediaProvider } from '../providers/wp-media/wp-media';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AmericaPage,
    AsiaPage,
    EuropaPage,
    AfricaPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atras',
      backButtonIcon: 'md-arrow-back',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      menuType: 'reveal',
      pageTransition: 'md-transition'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AmericaPage,
    AsiaPage,
    EuropaPage,
    AfricaPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WpProvider,
    WpMediaProvider,


  ]
})
export class AppModule { }
