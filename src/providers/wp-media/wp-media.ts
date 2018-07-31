import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class WpMediaProvider {
  // private url = 'https://maletaready.com/wp-json/wp/v2/';
  constructor(public http: HttpClient) {
    
  }

  mediaUrl(da){
    return this.http.get(da);
  }

}
