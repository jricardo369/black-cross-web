import { Component, OnInit } from "@angular/core";
import { AlertController, NavController, NavParams, LoadingController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { CalendarComponentOptions } from "ion2-calendar";

@Component({
  selector: "app-caladmin",
  templateUrl: "./caladmin.page.html",
  styleUrls: ["./caladmin.page.scss"],
})
export class CaladminPage implements OnInit {
  fechaf: any;
  fecha: any;
  date: string;
  type: "string";
  idUser: any;
  sociedad: any;
  idRol: any;

  usuario: any;

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams,
    private loadingController : LoadingController
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("Datos del usuario en caladmin:", this.usuario);
      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;
      this.idRol = this.usuario.respuesta.idRol;
      console.log("ID del usuario en caladmin", this.idUser);
    });
  }

  ngOnInit() {
    this.loadingInicio();
  }

  options: CalendarComponentOptions = {
    monthPickerFormat: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "Mayo",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    weekdays: ["D", "L", "M", "M", "J", "V", "S"],
    from: new Date(2020),
    // Desactivar los fines de semana
    // ,disableWeeks: [0, 6]
  };

  onClick(date, fechaf) {
    this.fecha = date._d;

    function format(d) {
      var mm = d.getMonth() + 1; // getMonth() is zero-based
      var dd = d.getDate();

      return [
        d.getFullYear(),
        "-",
        (mm > 9 ? "" : "0") + mm,
        "-",
        (dd > 9 ? "" : "0") + dd,
      ].join("");
    }

    fechaf = format(this.fecha);
    this.navCtrl.navigateRoot(
      "/horariosadmin/" + fechaf + "/" + this.idUser + "/" + this.sociedad +"/"+this.idRol
    );
    console.log(fechaf);
  }

  async loadingInicio() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando",
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
