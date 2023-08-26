import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from "src/app/servicios/login.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

  mensaje: string;
  usuario: any;
  sociedad: any;
  msjError: any;
  rol : any;

  perfiles: any[] = [];

  textoBuscar = '';

  listado: any;
  urlapi = "http://localhost:8080/bk-api/";

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
      this.rol = this.usuario.idRol;
      this.servicio.getProductos(this.sociedad).subscribe((data) => {
        console.log(data);
        this.listado = data;
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

  crearprod(){
    this.navCtrl.navigateRoot('/producto');
  }

}
