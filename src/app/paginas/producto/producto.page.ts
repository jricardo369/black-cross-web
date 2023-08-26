import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from "src/app/servicios/login.service";
import { Storage } from "@ionic/storage";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  mensaje: string;
  usuario: any;
  sociedad: any;
  msjError: any;
  rol : any;
  submitted = false;
  mensajerror: any;

  perfiles: any[] = [];

  textoBuscar = '';

  na = {
    "titulo": "",
    "descripcionCorta": "",
    "descripcionLarga": "",
    "costo": "",
    "fechaVencimiento": "",
    "oferta": ""
  }

  listado: any;
  urlapi = "http://localhost:8080/bk-api/";

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private servicio: LoginService
  ) { 
    this.storage.get("userData").then((user) => {
      this.usuario = user.respuesta;
      this.sociedad = this.usuario.sociedad;
      this.rol = this.usuario.idRol;
      
    });
  }

  ngOnInit() {
  }

  nuevaProducto(form: NgForm) {
    let obj = {
      "titulo": this.na.titulo,
      "descripcionCorta": this.na.descripcionCorta,
      "descripcionLarga": this.na.descripcionLarga,
      "costo": this.na.costo,
      "fechaVencimiento": this.na.fechaVencimiento,
      "idSociedad": this.sociedad,
      "idTipo:": 1,
      "oferta": this.na.oferta
    }
    this.submitted = true;

    if (form.valid) {

      this.servicio.setNuevoProducto(obj).subscribe((response: any) => {
        this.mensajerror = response.mensaje;
        this.mensaje = response.respuesta;
        if (response.codigo === 200) {
          this.presentLoading();
          this.clearForm();
        } else {
          this.errorCrear();
        }
      });
      console.log(this.na);
      // this.navCtrl.push(ClasesPage)

    } else {
      this.todoslosCampos()
    }
  }

  atras() {
    this.navCtrl.navigateBack('/shopping');
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: this.mensaje,
      duration: 700,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    // this.navCtrl.navigateRoot('/horariosadmin/' + this.fechaf)
    this.navCtrl.navigateRoot('/shopping');

  }

  clearForm(){
    this.na.titulo = "";
    this.na.descripcionCorta = "";
    this.na.descripcionLarga = "";
    this.na.fechaVencimiento = "";
    this.na.costo = "";
    this.na.oferta = "";
  }

  async errorCrear() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensajerror,
      buttons: ['OK']
    });

    await alert.present();
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

}
