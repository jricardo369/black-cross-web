import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController, NavParams } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-asistentes",
  templateUrl: "./asistentes.page.html",
  styleUrls: ["./asistentes.page.scss"],
})
export class AsistentesPage implements OnInit {

  fechaClase: Date = new Date();

  idClase: string;
  listado: any;
  nombre: string;
  profesor: string;
  fechaDeClase: string;
  fechaf: string;
  fecha: string;
  profesorNombre: string;
  descripcionHorario: string;
  horaFin;
  idUsuario;
  sociedad: any;
  horaInicio;
  horario;
  nombreC: string;
  usuario: any;
  personas: string;
  estatus;
  idrol;
  idUser;
  mensaje;

  idClaseP: any;
  nombreP: any;
  profesorP: any;
  fechafP: any;
  profesorNombreP: any;
  descripcionHorarioP: any;

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams,
    private alertCtrl: AlertController
  ) {

    /*this.idClaseP = this.activatedRoute.snapshot.paramMap.get("idClase");
    this.nombreP = this.activatedRoute.snapshot.paramMap.get("nombre");
    this.profesorP = this.activatedRoute.snapshot.paramMap.get("profesor");
    this.fechafP = this.activatedRoute.snapshot.paramMap.get("fechaf");
    this.profesorNombreP = this.activatedRoute.snapshot.paramMap.get("profesorNombre");
    this.descripcionHorarioP = this.activatedRoute.snapshot.paramMap.get("descripcionHorario");*/

    
  }

  ngOnInit() {
    this.idClase = this.activatedRoute.snapshot.paramMap.get("idClase");
    this.nombre = this.activatedRoute.snapshot.paramMap.get("nombre");
    this.profesor = this.activatedRoute.snapshot.paramMap.get("profesor");
    this.fechaf = this.activatedRoute.snapshot.paramMap.get("fechaf");
    this.profesorNombre =
      this.activatedRoute.snapshot.paramMap.get("profesorNombre");
    this.descripcionHorario =
      this.activatedRoute.snapshot.paramMap.get("descripcionHorario");

    console.log("El ID de la clase es :", this.idClase);

    console.log("fecha ngOnInit:" + this.fechaf);

    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("Datos del usuario:", this.usuario);
      this.idrol = this.usuario.respuesta.idRol;
      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;

      console.log(this.idrol, "Rol de usuario en Menu");
      console.log(this.idUser, "Id del usuario");
   

    this.servicio
      .getData(
        "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/AsistenciaClases/" +
          this.idClase +
          "?fecha=" +
          this.fechaf+"&sociedad="+this.sociedad
      )
      .subscribe((data) => {
        console.log(data, "ngOnInit");
        this.listado = data;

        // Convertir data en JSON
        let objUsuario = JSON.stringify(data);
        let json = JSON.parse(objUsuario);
        this.idUsuario = json.respuesta.usuarios.idUsuario;
        this.horaInicio = json.respuesta.clase.horaInicio;
        this.horaFin = json.respuesta.clase.horaFin;
        this.horario = json.respuesta.clase.horario;
        this.nombreC = json.respuesta.clase.nombre;
        this.personas = json.respuesta.clase.personas;
        this.estatus = json.respuesta.clase.estatus;
        this.fecha = json.respuesta.fecha;

        console.log("Hora inicio", this.horaInicio);
        console.log("Hora fin", this.horaFin);
      });

    });
  }

  ponerFalta(idUsuario, nombre,lugar,asistio) {
    console.log("Poner falta", idUsuario);
    console.log("Lugar", lugar);
    console.log("IdClase", this.idClase);
    console.log("fecha", this.fecha);
    console.log("Asistio", asistio);

    if(asistio === 'A'){
      this.presentAlertConfirm(nombre, idUsuario,lugar,this.idClase);
    }else{
      this.quitarfalta(nombre, idUsuario,lugar,this.idClase);
    }
  }

  async presentAlertConfirm(nombre, idUsuario,lugar,idClase) {
    console.log("Seguro que desea agregar falta");
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      message: nombre + " asistio a clase ?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Falta agregada");
            this.agregarquitarfalta(idUsuario,lugar,idClase,"I");
          },
        },
        {
          text: "Si",
          handler: () => {
            console.log("Usuario no falto");

            // this.classeliminar();
          },
        },
      ],
    });
    await alert.present();
  }

  agregarquitarfalta(idUsuario,lugar,idClase,tipo) {
    this.servicio
      .agregarFalta(idUsuario, this.idUser,lugar,idClase,this.fecha,tipo)
      .subscribe((response: any) => {
        console.log(response, "Falta agregada 2");

        this.mensaje = response.descripcion;

        if (response.codigo == 500) {
          this.deleteClase();
          console.log("ID de usuario con nueva falta", idUsuario);
          // this.navCtrl.navigateRoot("/clases");
        } else {
          this.deleteClase();
          this.obtenerDatos();
        }
      });
  }

  async quitarfalta(nombre, idUsuario,lugar,idClase) {
    console.log("Quitar falta");
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      message: " Deseas quitar su falta a "+nombre+" ?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Falta eliminada");
            
          },
        },
        {
          text: "Si",
          handler: () => {
            console.log("Usuario no falto");
            this.agregarquitarfalta(idUsuario,lugar,idClase,"CFC");
          },
        },
      ],
    });
    await alert.present();
  }

  obtenerDatos() {
    
    this.servicio
      .getData(
        "http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/AsistenciaClases/" +
          this.idClase +
          "?fecha=" +
          this.fechaf+"&sociedad="+this.sociedad
      )
      .subscribe((data) => {
        console.log(data, "recargar");
        this.listado = data;

        // Convertir data en JSON
        let objUsuario = JSON.stringify(data);
        let json = JSON.parse(objUsuario);
        this.idUsuario = json.respuesta.usuarios.idUsuario;
        this.horaInicio = json.respuesta.clase.horaInicio;
        this.horaFin = json.respuesta.clase.horaFin;
        this.horario = json.respuesta.clase.horario;
        this.nombreC = json.respuesta.clase.nombre;
        this.personas = json.respuesta.clase.personas;
        this.estatus = json.respuesta.clase.estatus;
        this.fecha = json.respuesta.fecha;

        console.log("Hora inicio", this.horaInicio);
        console.log("Hora fin", this.horaFin);
      });

  }

  async deleteClase() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      message: this.mensaje,
      buttons: ["OK"],
    });

    await alert.present();
    this.navCtrl.navigateRoot("/horariosadmin/" + this.fechaf+"/"+this.idUser+"/"+this.sociedad);
  }

  regresar() {
    this.navCtrl.navigateRoot("/horariosadmin/" + this.fechaf+"/"+this.idUser+"/"+this.sociedad+"/"+this.idrol);
  }
}
