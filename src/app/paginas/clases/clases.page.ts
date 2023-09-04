import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  listado: any;
  listadoRespuesta: any;
  listadoAnterior: any;
  usuario: any;
  idClase: string;
  filterTerm: string;
  fechaf: string;
  codigo: any;
  idrol: any;
  sociedad: any;

  urlapi = "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/";

  textoBuscar = '';

  constructor(
    private storage: Storage,
    private servicio: LoginService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {
    // this.usuario = this.navParams.get(this.usuario);
    // this.storage.get("userData").then((user) => {
    //   this.usuario = user;
    // });
  }

  ngOnInit() {

    this.storage.get("userData").then((data) => {
      this.usuario = data;
      this.sociedad = this.usuario.respuesta.sociedad;
    //this.horariosLoading();
      this.servicio.getData(this.urlapi + 'Clases?sociedad='+this.sociedad).subscribe(data => {

        let objUsuario = JSON.stringify(data);
        let json = JSON.parse(objUsuario);
        this.codigo = json.codigo;
        console.log("Codigo del get", this.codigo);

        if (this.codigo === 200) {
          console.log(data, "listado de clases");
          //this.quitLoading();
          // this.loadingController.dismiss(100);

          // this.horariosLoading();
          
          
          this.listadoAnterior = data;
          this.listado = data;
          this.listadoRespuesta = this.listadoAnterior.respuesta;
        } else {
          this.errorClases();
          this.navCtrl.navigateRoot('/admin')
        }
      });

    });
  }

  

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando clasess"
      // duration: 3000

    });
    await loading.present();
    await loading.dismiss();
    // const { role, data } = await loading.onDidDismiss();
  }

  // quitLoading() {
  //   this.loadingController.dismiss();
  // }

  async errorClases() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: "Error al mostrar las clases",
      buttons: ['OK']
    });

    await alert.present();
  }


  atras() {
    this.navCtrl.navigateBack('/admin');
  }

  crearclass(){
    this.navCtrl.navigateRoot('/crearclase');
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

      this.listado.respuesta = this.listado.filter((user) => {
      return (user.diaDescripcion.includes(this.textoBuscar));

    })

    }
    //console.log("listado return:"+this.listado.respuesta);
    //console.log("listado a:"+this.listadoAnterior);

  }

}
