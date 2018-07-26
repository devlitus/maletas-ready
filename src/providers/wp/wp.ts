import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WpProvider {
  private url = 'https://maletaready.com/wp-json/wp/v2/';
  constructor(public http: HttpClient) {
    console.log('Hello WpProvider Provider');
  }
  generalPost(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'posts?order=asc')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
  generalPages(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'pages/19?order=asc')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
  generalCategorias(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'categories')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
}
