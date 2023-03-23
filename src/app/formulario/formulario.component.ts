import { Component, OnInit } from '@angular/core';
import { Formulario } from '../model/Formulario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  mostrarNombre: boolean = false;
  mostrarIntentos: boolean = false;
  numero: number = 0;
  adivina: number = -1;
  numerosIntroducidos: any = [];
  count: number = 0;
  intentos: number = 0;
  acertado: string = 'NO';
  form: Formulario;
  constructor() {
    this.form = new Formulario("", "", 0, 0);
  }
  ngOnInit(): void {

  }

  recogerDatos(): void {
    if (comprobarCampos(this.form)) {
      window.alert("Revise los campos vacios");
    } else {
      this.mostrarNombre = true;
      this.numero = generarNumeroRandom(this.form.rango);
      console.log("número aleatorio generado: " + this.numero);
      this.intentos = this.form.intento;
    }
  }

  adivinaNumero() {
    if (this.adivina > this.form.rango) {
      this.numerosIntroducidos.push(this.adivina);
      this.mostrarIntentos = true;
      window.alert("El número esta fuera del rango seleccionado");
    }

    this.numerosIntroducidos.push(this.adivina);
    this.count++;
    this.intentos--;
    if (this.numero == this.adivina) {
      this.acertado = 'SI';
      this.mostrarIntentos = true;
    }
    if (this.count >= this.form.intento) {
      this.mostrarIntentos = true;
    }

  }

  reset() {
    this.numerosIntroducidos = [];
    this.mostrarNombre = false;
    this.mostrarIntentos = false;
    this.count = 0
  }
}

function generarNumeroRandom(rango: number): number {
  return Math.floor(Math.random() * rango + 1);
}

function comprobarCampos(form: Formulario) {
  let camposVacios: boolean = false;
  if (form.nombre == '' || form.apellido == '' || form.rango <= 0 || form.intento <= 0) {
    camposVacios = true;
  }
  return camposVacios;
}

