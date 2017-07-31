import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactoService {
  uriContacto = "http://localhost:3000/";
  contactos: Array<any>;

  constructor(
    private http:Http,
    private router:Router
  ) {  }

  public setCurrentUser(usuario:any) {
    localStorage.setItem('currentUser', usuario);
  }

  public getContactos(): any {
    let uri = this.uriContacto + 'api/v1/contacto/';
    let token = localStorage.getItem('token');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    headers.append('Authorization', token);

    return this.http.get(uri, options)
      .map(res => {
        console.log("Response: " + JSON.stringify(res.json()));
        this.contactos = res.json();
      });
  }

  public agregarContacto(contacto:any) {
    let uri = this.uriContacto + 'api/v1/contacto/';
    let token = localStorage.getItem('token');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    headers.append('Authorization', token);

    let data = JSON.stringify(contacto);

    this.http.post(uri, data, options)
    .subscribe( res => {
      console.log(res.json());
      this.getContactos();
    });
  }

}
