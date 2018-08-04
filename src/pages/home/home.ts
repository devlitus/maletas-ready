import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//provider
import { WpProvider } from "../../providers/wp/wp";
//Pages
import { AmericaPage, AsiaPage, EuropaPage, AfricaPage } from "../../app/index-pages";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public post: any = [];
  public page: any = [];
  public categoria: any = [];
 
  constructor(
    public navCtrl: NavController,
    private _wpService: WpProvider,
  ) {
    this.getPost();
    this.getPage();
    this.getCategoria();
  }
  onPages(page, id){
    switch (page) {
      case 'america':
        this.navCtrl.push(AmericaPage, {id});
        break;
      case 'europa':
        this.navCtrl.push(EuropaPage, {id});
        break;
      case 'africa':
        this.navCtrl.push(AfricaPage, {id});
        break;
      case 'asia':
        this.navCtrl.push(AsiaPage, {id});
        break;
      default:
        this.navCtrl.push(HomePage);
        break;
    }
  }
  getPage(){
    this._wpService.generalPages()
    .then(data => {
      this.detallPages(data);
    })
    .catch(e => {console.error('fallo de post ', e);})
  }
  detallPages(data){
    let detallPage;
    for (const pg of data) {
      detallPage = {
        'id': pg.id,
        'title': pg.title.rendered,
        'content': pg.content.rendered,
        'excerpt': pg.excerpt.rendered,
        'slug': pg.slug,
      }
      this.page.push(detallPage);
    }
  }
  getPost(){
    this._wpService.generalPost()
    .then(data => {
      this.setPost(data);
    })
    .catch(e => {console.error('fallo de post ', e);})
  }
  setPost(data){
    let detallPost;
    for (const p of data) {
      detallPost = {
        'id': p.id,
        'title': p.title.rendered,
        'content': p.content.rendered,
        'excerpt': p.excerpt.rendered,
        'urlPost': p._links.self[0].href,
        'featured_media': p.featured_media,
        'categoria': p.categories
      }
      this.post.push(detallPost);
    }
  }
 
  getCategoria(){
    this._wpService.generalCategorias()
    .then(data => {
      this.detallCategoria(data);
    })
    .catch(e => {console.error('fallo de post ', e);})
  }
  detallCategoria(data){
    let detallCategoria;
    for (const ca of data) {
      detallCategoria = {
        'id': ca.id,
        'slug': ca.slug
      }
      this.categoria.push(detallCategoria);
    }
  }
}
