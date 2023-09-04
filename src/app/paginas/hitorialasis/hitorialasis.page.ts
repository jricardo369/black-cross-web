import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from "src/app/servicios/login.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-hitorialasis',
  templateUrl: './hitorialasis.page.html',
  styleUrls: ['./hitorialasis.page.scss'],
})
export class HitorialasisPage implements OnInit {

  mensaje: string;
  usuario: any;
  sociedad: any;
  msjError: any;

  perfiles: any[] = [];

  textoBuscar = '';

  listado: any;
  listadoAnterior: any;
  listadoRespuesta: any;
  urlapi = "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/";

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private servicio: LoginService
  ) { 
    this.storage.get("userData").then((user) => {
      this.usuario = user.respuesta;
      this.sociedad = this.usuario.sociedad;
      this.servicio.getAsistenciasSitio(this.sociedad).subscribe((data) => {
        console.log(data);
        this.listadoAnterior = data;
        this.listado = data;
        this.listadoRespuesta = this.listadoAnterior.respuesta;
        let objUsuario = JSON.stringify(data);
        let json = JSON.parse(objUsuario);
        this.mensaje = json.descripcion;
        if (json.codigo === 200) {
          // this.loadingController.dismiss();
          console.log("Entro bien");
        } else {
          this.navCtrl.navigateRoot('/admin');
        }
      });
    });
  }

  ngOnInit() {
  }

  atras() {
    this.navCtrl.navigateBack('/admin');
  }

  buscar(event) {
    console.log(event);
    this.textoBuscar = event.detail.value;

    console.log("texto buscar:"+this.textoBuscar);
    //console.log("buscar:"+this.listado);
    //console.log("listado a:"+this.listadoAnterior);

    if (!this.textoBuscar) { 

      return this.listado.respuesta = this.listadoRespuesta;

    }else{

      this.listado.respuesta = this.listado.respuesta.filter((user) => {
      return (user.nombreUsuario.includes(this.textoBuscar));

    })

    }
  }

}
