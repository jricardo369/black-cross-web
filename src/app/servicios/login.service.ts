import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { tap } from 'rxjs/operators'
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class LoginService {
  //url = "http://localhost:8080/bk-api/";  
  url = "http://localhost:8080/bk-api/";
  httpOptions;

  constructor(private http: HttpClient) {
    console.log("Servicio de login");
  }

  getData(url) {
    return this.http.get(`${url}`);
  }

  getDataPost(url) {
    return this.http.post(`${url}`,this.httpOptions);
  }
  

  // getData(url) {
  //   return this.http.get(`${url}`)
  //   .pipe(
  //     delay(1000)
  //   );
  // }

  // Obterner inscripciones por id

  getInscipciones(idUsuario,sociedad){
    return this.http.get(this.url + "Inscripciones?idUsuario=" + idUsuario + "&sociedad=" + sociedad,this.httpOptions)
    .pipe(
          delay(1000)
        );
  }

  // Obtener lugares apartados

  getLugares(idClase, fechaf){
    return this.http.get(this.url + "AsistenciaClases/lugares/" + idClase + "?fecha=" + fechaf ,this.httpOptions)
    .pipe(
          delay(1000)
        );
  }



  // Obternet todos los usuarios

  getUsuarios(){
    return this.http.get(this.url + "Usuarios/",this.httpOptions)
    .pipe(
          delay(1000)
        );
  }

  // Buscar usuarios

  buscarUsuario(){
    return this.http.get<any[]>(this.url + "Usuarios/")    
  }

  // Servicio de editar usuario
  editarUsuario(editar) {
    editar = JSON.stringify(editar);
    console.log(editar,"Editar service");
    return this.http.put(this.url + "Usuarios", editar, this.httpOptions);
  }

  // Servicio de editar user (telefono y correo electronico)
  editarUser(editar) {
    editar = JSON.stringify(editar);
    console.log(editar,"Editar service");
    return this.http.put(this.url + "Usuarios/actualizar-datos-perfil", editar, this.httpOptions);
  }

  // Servicio cambiar status
  activarUser(idUsuario) {
    return this.http.put(this.url + "Usuarios/" + idUsuario + "/1", this.httpOptions);

  }

  // Servicio de desactivar usuario

  desactivarUser(idUsuario) {
    return this.http.put(this.url + "Usuarios/" + idUsuario + "/0", this.httpOptions);
  }

  // Servicio bloqueo por pago

  bloquePorPago(idUsuario){
    return this.http.put(this.url + "Usuarios/" + "falta-pago/" + idUsuario, this.httpOptions);
  }

  // Servicio de apartar lugar

  // asistenciaAlumno(idClase, idUsuario, fecha) {
  //   return this.http.post(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha, this.httpOptions);
  // }

  // Servicio apartar lugar con imagen

  asistenciaAlumno(idClase, idUsuario, fecha) {
    console.log("Servicio asistencia alumnos por lugar");
    return this.http.post(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha , this.httpOptions);   
  }

  eliminarAsistenciaAlumno(idClase, idUsuario, fecha) {
    console.log("Servicio asistencia alumnos por lugar");
    return this.http.delete(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha , this.httpOptions);   
  }

  // Usuario bloqueado por pago
  expulsarXpago(idUsuario){
    console.log("Servicio Expulsar por pago", idUsuario);
    return this.http.get(this.url + "Usuarios/bloqueo-por-pago/"+idUsuario,this.httpOptions);
  }


  // Servicio eliminar asistencia
  eliminarAlumno(idUsuario, idClase, fecha) {
    return this.http.delete(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha, this.httpOptions);
  }

  // Servicio eliminar asueto por fecha
  deleteAsueto(fecha){
    return this.http.delete(this.url + 'Asuetos?fecha=' + fecha ,this.httpOptions);
  }

  // Servicio eliminar asueto por idAsueto
  deleteAsuetoXfecha(fecha){
    return this.http.delete(this.url + 'Asuetos?fecha=' + fecha ,this.httpOptions);
  }

  // Servicio crear nuevo usuario
  setCrear(clase) {
    clase = JSON.stringify(clase);
    console.log(clase);
    return this.http.post(this.url + 'Usuarios/', clase, this.httpOptions)
  }

  // Servicio nuevo paquete

  setPaquete(paquete,fecha,idUser) {
    paquete = JSON.stringify(paquete);
    console.log(paquete);
    return this.http.post(this.url + 'Inscripciones?fecha='+fecha+"&idUsuario="+idUser, paquete, this.httpOptions)
  }


  // Servicio crear nuevo asueto
  setNasueto(asueto) {
    asueto = JSON.stringify(asueto);
    console.log(asueto);
    return this.http.post(this.url + 'Asuetos', asueto, this.httpOptions)
  }

  // Editar password (usuario)

  cambiarPass(pass) {
    pass = JSON.stringify(pass);
    console.log(pass);
    return this.http.put(this.url + "Usuarios/cambio-contrasenia/", pass, this.httpOptions);
  }

  // Recuperar Pass

  recuperarPass(pass) {
    pass = JSON.stringify(pass);
    console.log(pass);
    return this.http.put(this.url + "Usuarios/", pass, this.httpOptions);
  }


  // Servicio crear clase

  setNuevaclase(nClase) {
    nClase = JSON.stringify(nClase);
    console.log(nClase);
    return this.http.post(this.url + 'Clases',nClase, this.httpOptions)
  }

  // Editar Clase

  editarClase(edit) {
    edit = JSON.stringify(edit);
    console.log(edit);
    return this.http.put(this.url + 'Clases',edit, this.httpOptions)
  }

  // Eliminar Clase

  eliminarClase(idClase) {
    return this.http.delete(this.url + "Clases/" + idClase, this.httpOptions);
  }

  // Eliminar Asuetos

  //Agregar falta 
  agregarFalta(idUsuario,idUser,lugar,idClase,fecha,tipo){
    return this.http.put(this.url + "Usuarios/multas/"+idUsuario+"?idUsuarioModificante="+idUser+"&funcion="+tipo+"&idClase="+idClase+"&lugar="+lugar+"&fecha="+fecha, this.httpOptions);
  }

  //Eliminar Faltas
  eliminarFaltas(idUsuario,idUser){
    return this.http.put(this.url + "Usuarios/multas/"+idUsuario+"?idUsuarioModificante="+idUser+"&funcion=E", this.httpOptions);
  }

  //Eliminar Faltas
  ajustarFalta(idUsuario,idUser,tipo){
    return this.http.put(this.url + "Usuarios/faltas/"+idUsuario+"?idUsuarioModificante="+idUser+"&funcion="+tipo, this.httpOptions);
  }

  //Nuevo producto
  setNuevoProducto(nProd) {
    nProd = JSON.stringify(nProd);
    console.log(nProd);
    return this.http.post(this.url + 'Productos',nProd, this.httpOptions)
  }

  getProductos(sociedad: any){
    return this.http.get(this.url + "Productos?sociedad="+sociedad,this.httpOptions)
    .pipe(
          delay(1000)
        );
  }

  getAsistenciasSitio(sociedad: any){
    return this.http.get(this.url + "AsistenciaSitio?sociedad="+sociedad,this.httpOptions)
    .pipe(
          delay(1000)
        );
  }

  loginPost(user) {
    console.log(user, "Bienvenido Login Post");
    user = JSON.stringify(user);
    console.log("iNICIAR sESION ",user);
    return this.http.post(this.url + "IniciarSesion/iniciar-sesion" , user, this.httpOptions)

  }
}
