import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//pages
import {
  MyApp,
  HomePage,
  ListPage,
  AmericaPage,
  AsiaPage,
  EuropaPage,
  AfricaPage
} from "./index-pages";
//providers
import { WpProvider } from '../providers/wp/wp';
import { WpMediaProvider } from '../providers/wp-media/wp-media';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AmericaPage,
    AsiaPage,
    EuropaPage,
    AfricaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AmericaPage,
    AsiaPage,
    EuropaPage,
    AfricaPage
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
