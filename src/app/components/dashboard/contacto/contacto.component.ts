import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoService } from '../../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: 'contacto.component.html',
  providers: [ContactoService]
})
export class ContactoComponent implements OnInit {
  constructor(private contactoService: ContactoService) {  }
    formularioContacto:FormGroup;
    formularioUpdate:FormGroup;

 ngOnInit() {
    let validaciones = [
      Validators.required, Validators.minLength(2)
    ]

    this.contactoService.getContactos().subscribe();

    this.formularioContacto = new FormGroup({
      'idUsuario': new FormControl('', validaciones),
      'nombre': new FormControl('', validaciones),
      'apellido': new FormControl('', validaciones),
      'telefono': new FormControl('', validaciones),
      'direccion': new FormControl('', validaciones),
      'idCategoria': new FormControl('', validaciones),
    });
  }

  public agregarContacto() {
    console.log(this.formularioContacto.value);
    this.contactoService.agregarContacto(this.formularioContacto.value)
  }
}
