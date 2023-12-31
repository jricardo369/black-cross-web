import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-clasesalumnos',
  templateUrl: './clasesalumnos.page.html',
  styleUrls: ['./clasesalumnos.page.scss'],
})
export class ClasesalumnosPage implements OnInit {


  listado:any;
  // usuario:any;
  idClase: string;

  urlapi="http://ec2-13-58-189-47.us-east-2.compute.amazonaws.com:8080/bk-api/";
  
  constructor(
    private servicio : LoginService,
    public loadingController: LoadingController,
    public alertController: AlertController,    
  ) { }

  ngOnInit() {

    this.servicio.getData(this.urlapi + 'Clases').subscribe(data =>{
      console.log(data, "listado de clases");
      this.presentLoading();
      this.listado=data;
    });
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Por favor espere...',
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'La clase esta llena',
      buttons: ['OK']
    });

    await alert.present();
  }  
}
