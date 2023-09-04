import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/servicios/login.service";
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  codigo: any;
  usuario: any;
  sociedad: any;

  constructor(
    private servicio: LoginService,
    private storage: Storage,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) { 

    this.storage.get("userData").then((user) => {
      this.usuario = user.respuesta;
      this.sociedad = this.usuario.sociedad;
    });

  }

  ngOnInit() {
    this.codigo= '';
   
  }

  atras() {
    this.navCtrl.navigateBack('/admin');
  }

  async valor(n:any) {
    console.log('numero:'+n);
    if(n === undefined){
      this.codigo = this.codigo.substring(0, this.codigo.length-1);
    }else{
      var total = this.codigo +"" +n;
      this.codigo = total;
    }
    
    
  }

  entrar() {
    if(this.codigo === ''){
      this.mensaje('Es necesario ingresar el codigo para entrar');
    }else{
      this.asistencia();
    }
  }

  limpiar() {
    this.codigo ='';
  }

  asistencia() {
    this.servicio.getDataPost(
        "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/AsistenciaSitio/" +
          this.codigo+"?sociedad="+this.sociedad
      )
      .subscribe((data: any) => {
        console.log(data);
        var resp = data;
        console.log(data.codigo);
        if(data.codigo == 200){
          this.mensaje(data.mensaje);
        }else{
          this.mensaje(data.mensaje);
        }
      });

    return;
  }

  async mensaje (mensaje: any){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
