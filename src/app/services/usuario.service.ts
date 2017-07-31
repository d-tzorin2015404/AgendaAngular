import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
  uriUsuario = "http://localhost:3000/";
  usuarios: Array<any>;

  constructor(
    private http:Http,
    private router:Router
  ) {  }

  public autenticar(usuario:any) {
    let uri = this.uriUsuario + 'auth/';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });

    let data = JSON.stringify(usuario);

    this.http.post(uri, data, options)
    .subscribe( res => {
      console.log(res.json());

      this.setToken(res.json().token);

      this.setCurrentUser({
        nick: res.json().nick,
        idUsuario: res.json().idUsuario
      });

      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error.text());
    });
  }

  public setToken(token:string) {
    if(localStorage.getItem('token') != token) {
      localStorage.removeItem('token');
      localStorage.setItem('token', token);
    }
  }

  public setCurrentUser(usuario:any) {
    localStorage.setItem('currentUser', usuario);
  }

  public verificarSesion():boolean {
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  public getUsuarios(): any {
    let uri = this.uriUsuario + 'api/v1/usuario/';
    let token = localStorage.getItem('token');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    headers.append('Authorization', token);

    return this.http.get(uri, options)
      .map(res => {
        console.log("Response: " + JSON.stringify(res.json()));
        this.usuarios = res.json();
      });
  }

  public agregarUsuario(usuario:any) {
    let uri = this.uriUsuario + 'api/v1/usuario/';
    let token = localStorage.getItem('token');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({'headers': headers});
    headers.append('Authorization', token);

    let data = JSON.stringify(usuario);

    this.http.post(uri, data, options)
    .subscribe( res => {
      console.log(res.json());
      this.getUsuarios();
    });
  }

}
