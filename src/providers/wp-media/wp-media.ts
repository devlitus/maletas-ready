import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class WpMediaProvider {
  // private url = 'https://maletaready.com/wp-json/wp/v2/';
  constructor(public http: HttpClient) {
    
  }
  mediaUrlAsia(da){
    return this.http.get(da);
  }
  mediaUrlAmerica(datos){
    return this.http.get(datos);
  }
  mediaUrlEuropa(datos){
    return this.http.get(datos);
  }
  mediaUrlAfrica(datos){
    return this.http.get(datos);
  }
  mediaUrl(data){
    return this.http.get(data);
  }

}
