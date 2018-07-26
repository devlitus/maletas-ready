import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//provider
import { WpProvider } from "../../providers/wp/wp";
import { WpMediaProvider } from "../../providers/wp-media/wp-media";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public post: any = []
  public page: any = [];
  constructor(
    public navCtrl: NavController,
    private _wpService: WpProvider,
    private _wpMediaService: WpMediaProvider
  ) {this.getPost(); this.getPage() }

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
        'urlPost': p._links.self[0].href
      }
      this.post.push(detallPost);
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
        'excerpt': pg.excerpt.rendered
      }
      this.page.push(detallPage);
    }
    console.log(detallPage.id);
  }
}
