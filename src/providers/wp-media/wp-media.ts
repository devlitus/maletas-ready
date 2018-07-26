import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WpMediaProvider {
  private url = 'https://maletaready.com/wp-json/wp/v2/';
  constructor(public http: HttpClient) {
    console.log('Hello WpMediaProvider Provider');
  }
  generalMedia(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'media')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }

}
