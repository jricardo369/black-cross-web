import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from "@ionic/storage";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.page.html',
  styleUrls: ['./verproducto.page.scss'],
})
export class VerproductoPage implements OnInit {

  mensaje: string;
  usuario: any;
  sociedad: any;
  msjError: any;
  rol : any;
  titulo: any;
  descc; any;
  descl: any;
  costo: any;

  perfiles: any[] = [];

  textoBuscar = '';

  constructor(
    private storage: Storage,
    private servicio: LoginService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) { 
    this.storage.get("userData").then((user) => {
      this.usuario = user.respuesta;
      this.sociedad = this.usuario.sociedad;
      this.rol = this.usuario.idRol;
      this.titulo = this.activatedRoute.snapshot.paramMap.get('titulo');
      console.log('titulo:'+this.titulo);
      this.descc = this.activatedRoute.snapshot.paramMap.get('descc');
      console.log('descc:'+this.descc);
      this.descl = this.activatedRoute.snapshot.paramMap.get('descl');
      console.log('descl:'+this.descl);
      this.costo = this.activatedRoute.snapshot.paramMap.get('costo');
      console.log('costo:'+this.costo);
      
    });
  }

  ngOnInit() {
  }

  atras() {
    this.navCtrl.navigateBack('/shopping');
  }

}
