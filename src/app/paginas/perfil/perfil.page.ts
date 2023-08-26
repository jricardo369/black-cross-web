import { Component, OnInit } from "@angular/core";
import { LoadingController, ActionSheetController, AlertController, NavController, NavParams } from "@ionic/angular";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { IfStmt } from '@angular/compiler';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {

  mensaje: string;
  idUsuario
  msjError

  perfiles: any[] = [];

  textoBuscar = '';

  listado: any;
  urlapi = "http://localhost:8080/bk-api/";

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) 
  { }

  ngOnInit() {

    // this.servicio.getData(this.urlapi + "Usuarios/").subscribe((data) => {
      this.servicio.getUsuarios().subscribe((data) => {
      console.log(data);
      this.listado = data;
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.mensaje = json.descripcion;
      if (json.codigo === 200) {
        // this.loadingController.dismiss();
        console.log("Entro bien");
      } else {
        this.errorCargar();
        this.navCtrl.navigateRoot('/admin');
      }
    });
  }

  activar(idUsuario){

    this.servicio.activarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, "Usuario Activado");
        this.userActivado();
        this.obtenerDatos();
      } else {
        this.msjError();
      }
    });
  }

  desactivar(idUsuario){

    this.servicio.desactivarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, "Usuario Desactivado");
        this.userDesactivado();
        this.obtenerDatos();
      } else {
        this.msjError();
      }
    }); 
  }

  bPago(idUsuario){

    this.servicio.bloquePorPago(idUsuario).subscribe((response: any) => {
      this.mensaje = response.descripcion;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, "Usuario desactivado por pago");
        this.userDesactivado();
        this.obtenerDatos();
      } else {
        this.msjError();
      }
    });
  }

  menuPerfil() {
    this.navCtrl.navigateRoot('/admin');
  }

  registro() {
    this.navCtrl.navigateRoot('/registro');
  }

  buscar(event) {
    console.log(event);
    this.textoBuscar = event.detail.value;
  }

  async errorCargar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async userActivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  obtenerDatos() {
    this.servicio.getData(this.urlapi + "Usuarios/").subscribe((data) => { 
      this.listado = data;
    });
  }
}
