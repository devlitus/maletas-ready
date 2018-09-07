import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class EmailProvider {

  constructor(public http: HttpClient, private emailComposer: EmailComposer) {
    
  }

  configEmail(){
    let to = 'info@maletaready.com';
    // let to: string = 'developercarles@gmail.com';
    let cc: string;
    let bcc: string[]=[];
    let subject: string;
    let body: string; 
    let attachments: any[]=[];
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
    });
    
    let email = {
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      body: body,
      attachments: attachments,
      isHtml: true
    };
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
