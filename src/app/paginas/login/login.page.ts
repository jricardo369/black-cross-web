import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = {
    "usuario": "",
    "contrasenia": ""
  };

  mensaje: string;
  Rol
  usuario
  codigo

  submitted = false;

  constructor(
    private servicio: LoginService,
    private loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController,
    public alertController: AlertController,
    public network:Network,
    public dialogs: Dialogs

  ) { 
    this.network.onDisconnect().subscribe(()=>
    {
      console.log("No tienes conexión a internet");
      this.dialogs.alert('No tienes conexión a internet');
      this.sinCon();
    });

    this.network.onConnect().subscribe(()=>
    {
      setTimeout(() => {
        console.log("Estas conectado a internet");
        this.dialogs.alert('Tienes conexion' + this.network.type + 'Woohooo!!!');
        this.conCon();
      },2000);
    });
  }

  onLogin(form: NgForm) {
    let obj = {
      "usuario": this.login.usuario,
      "contrasenia": this.login.contrasenia
    }
    this.submitted = true;

    if (form.valid) {

      console.log(this.storage);
      
      this.servicio.loginPost(obj).subscribe((response: any) => {

        let data = response;

        this.storage.set('userData', data);    
        
        console.log("json",data); 

        this.codigo = response.codigo;
        console.log(response, "Login nuevo method");

        if (response.codigo == 200) {

          this.mensaje = response.mensaje;
          this.Rol = response.respuesta.idRol;
          this.usuario = response.respuesta.usuario;
          
          this.presentLoading();

          if (this.Rol === 1) {
            console.log(this.login.usuario);
            console.log("Usuario Administrador");
            this.navCtrl.navigateRoot('/admin');

          } else

            if (this.Rol === 2) {
              console.log(this.login.usuario);
              console.log("Usuario Cliente",)
              this.navCtrl.navigateRoot('/admin');
              // this.navCtrl.navigateRoot('/calalumno');
              this.clearForm();
            } else

            if (this.Rol === 3) {
              console.log(this.login.usuario);
              console.log("Usuario Entrenador",)
              this.navCtrl.navigateRoot('/admin');
              // this.navCtrl.navigateRoot('/calalumno');
              this.clearForm();
            }

              if (this.Rol === null) {
                console.log("Usuario no registrado");
                this.clearForm();
              }

        } else if (response.codigo === 500) {
          this.errorLogin(response.descripcion);
          console.log("Error 500");
          
        }
          
      });
      console.log(this.login);

    } else {
      this.todoslosCampos()
    }

  }

  // Sin conexión a internet

  async conCon() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Tienes Conexión a internet",
      buttons: ['OK']
    });

    await alert.present();
  }

  // Sin conexión a internet
  async sinCon() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "No tienes Conexión a internet",
      buttons: ['OK']
    });

    await alert.present();
  }

  // Alert error 500
  async errorLogin(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Alert todos los campos necesarios
  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      translucent: true,
      message: 'Bienvenido' + ' ' + this.usuario,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async Loadingdatosinc(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msj,
      buttons: ['OK']
    });
    await alert.present();
  }

  clearForm() {
    this.login.contrasenia = '';
    this.login.usuario = '';
  }

  async showAlert(msj) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atencion !',
      message: 'Usuario desactivado, contactate con el administrador.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    console.log("Se inicio la App");
      this.storage.get("userData").then((data) => {
        this.usuario = data;
        console.log("user :", data);
        if (data !== null) {

          if (this.usuario.respuesta.idRol === 1) {
            console.log("Usuario Administrador");
            this.navCtrl.navigateRoot('/admin');

          } 
          
          if (this.usuario.respuesta.idRol === 2) {
            console.log("Usuario Entrenador");
            this.navCtrl.navigateRoot('/admin');
          }
          
          else

            if (this.usuario.respuesta.idRol=== 2) {
              // Consultar servicio si no esta bloqueado el usuario
              console.log("Usuario Cliente",);
              this.bloqueado(this.usuario.respuesta.idUsuario);             
            }          
        }
      });
  }

  recuperar(){
    this.navCtrl.navigateRoot('/recuperar');
  }

  bloqueado(usuario){

    this.servicio.getData('http://localhost:8080/bk-api/Usuarios/bloqueo-por-pago/'+ usuario ).subscribe(data => {

      this.usuario = data;
      console.log(data);
      
    if (this.usuario.codigo === 500) {
      this.storage.clear();
      this.navCtrl.navigateRoot('/login');
      this.msjBloqueado(this.usuario.descripcion);
    }else{
      this.navCtrl.navigateRoot('/admin');
      
    }
    });

    return 
  }

  async msjBloqueado(descripcion) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atencion !',
      message: descripcion,
      buttons: ['OK']
    });

    await alert.present();
  }

}
