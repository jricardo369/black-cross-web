import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute } from "@angular/router";
import {
  NavParams,
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-horarios",
  templateUrl: "./horarios.page.html",
  styleUrls: ["./horarios.page.scss"],
})
export class HorariosPage implements OnInit {
  listado: any;
  usuario: any;
  idClase: string;
  idUsuario: string;
  fechaf: string;
  numeroUsuario: string;
  mensaje: string;
  estatus: string;
  nombre;
  mensajeerror: string;
  codigo;
  idrol;
  lugar: any;

  urlapi = "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/";

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navParams: NavParams,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {

      this.usuario = user;
      this.idrol = this.usuario.respuesta.idRol;
      console.log('El rol del usuario logeado:'+this.idrol);
      console.log("El usuario en HORARIO es :", this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      this.numeroUsuario = this.usuario.respuesta.idUsuario;

      this.fechaf = this.activatedRoute.snapshot.paramMap.get("fechaf");
      this.idUsuario;

      // this.horariosLoading();

      this.servicio
        .getData(
          this.urlapi +
            "Clases" +
            "/para-usuario/" +this.fechaf+"/"+
            this.numeroUsuario
        )
        .subscribe((data) => {
          console.log(data, "listado de clases");

          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          console.log("Codigo del get", this.codigo);

          if (this.codigo === 200) {
            // this.quitLoading();
          } else {
            this.errorQuitar();
            this.navCtrl.navigateRoot("/calalumno");
          }
          this.listado = data;
          console.log(this.fechaf, "fecha del constructor");
        });
      this.bloqueado(this.numeroUsuario);
    });
  }

  ionViewWillEnter() {
    this.fechaf = this.activatedRoute.snapshot.paramMap.get("fechaf");
    console.log(this.fechaf, "fecha del calendario");
  }

  ngOnInit() {

   

  }

  obtenerDatos() {
    this.servicio
      .getData(
        this.urlapi +
          "Clases" +
          "/por-fecha/" +
          this.fechaf +
          "/" +
          this.numeroUsuario
      )
      .subscribe((data) => {
        console.log(data, "listado de clases");
        this.listado = data;
      });
  }

  asistencia(idClase,nombre,asistencia){
    console.log("idClase" + idClase);
    if(asistencia === "true"){
      this.deleteAsistencia(idClase,nombre);
    }else{
      this.agregarAsistencia(idClase,nombre);
    }
  }



  async agregarAsistencia(idClase,nombre) {
   
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      message:
        "Seguro que desea agregar su asistencia a clase" +
        nombre +
        " ? " ,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Boton de cancelar");
          },
        },
        {
          text: "Aceptar",
          handler: () => {
            this.marcarAsistencia(idClase);
            this.navCtrl.navigateRoot("/calalumno");
            // this.eliminarAsueto(fecha);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAsistencia(idClase,nombre) {
   
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      message:
        "Seguro que desea eliminar su asistencia de " +
        nombre +
        " ? " ,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Boton de cancelar");
          },
        },
        {
          text: "Aceptar",
          handler: () => {
            this.quitarAsistencia(idClase);
            this.navCtrl.navigateRoot("/calalumno");
            // this.eliminarAsueto(fecha);
          },
        },
      ],
    });
    await alert.present();
  }




  marcarAsistencia(idClase) {
    this.fechaf = this.activatedRoute.snapshot.paramMap.get("fechaf");
    this.servicio
      .asistenciaAlumno(idClase,this.numeroUsuario, this.fechaf)
      .subscribe((response: any) => {
        console.log(response, "Asistencia creada");
        this.mensaje = response.respuesta;
        this.mensajeerror = response.descripcion;
        if (response.codigo === 200) {
          this.eliminarAsistencia();
          console.log("Fecha seleccionada", this.fechaf);
          this.obtenerDatos();
        } else if (response.codigo === 500) {
          console.log("Erro 500");
          this.errorQuitar();
        }
      });
  }

  quitarAsistencia(idClase) {
    console.log("fecha f:" + this.fechaf);
    this.servicio
      .eliminarAlumno(this.numeroUsuario, idClase, this.fechaf)
      .subscribe((response: any) => {
        console.log(response, "Asistencia eliminada");
        this.mensaje = response.respuesta;
        this.mensajeerror = response.descripcion;
        if (response.codigo === 200) {
          this.eliminarAsistencia();
          console.log("Fecha seleccionada", this.fechaf);
          this.obtenerDatos();
        } else if (response.codigo === 500) {
          console.log("Erro 500");
          this.errorQuitar();
        }
      });
  }

  async agregadoAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: this.mensaje,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async errorQuitar() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: this.mensajeerror,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async usuarioEnclase() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: this.mensajeerror,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async eliminarAsistencia() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: this.mensaje,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      spinner: "crescent",
      message: "Cargando clases",
      duration: 5000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async validacion() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: this.mensajeerror,
      buttons: ["OK"],
    });

    await alert.present();
  }

  atras() {
    this.navCtrl.navigateRoot("/calalumno");
  }

  quitLoading() {
    this.loadingController.dismiss();
  }

  bloqueado(idUsuario) {
    this.servicio
      .getData(
        "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/Usuarios/bloqueo-por-pago/" +
          idUsuario
      )
      .subscribe((data) => {
        this.usuario = data;
        console.log(data);

        if (this.usuario.codigo === 500) {
          this.storage.clear();
          this.navCtrl.navigateRoot("/login");
          this.msjBloqueado(this.usuario.descripcion);
        }
      });

    return;
  }

  async msjBloqueado(descripcion) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: descripcion,
      // message: descripcion,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
