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
      this.http.get(this.url+'posts')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
  generalPages(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'pages?order=asc&per_page=100')
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
  idPagesAmerica(id){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'pages/'+id)
      .subscribe(data => {
        resolve(data);
      }) 
    })
    return promise;
  }
  postAmerica(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'posts?categories=58&per_page=100')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
  postAsia(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'posts?categories=57&per_page=100')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
  postEuropa(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'posts?categories=60')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
  postAfrica(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.url+'posts?categories=59')
      .subscribe(data => {
        resolve(data);
      })
    })
    return promise;
  }
}
