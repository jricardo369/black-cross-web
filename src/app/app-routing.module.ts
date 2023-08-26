import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editarperfil/:idUsuario/:idRol/:usuario/:sexo/:correoElectronico/:nombre/:telefono/:contrasenia/:estatus/:totalMultas',
    loadChildren: () => import('./paginas/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  // {
  //   path: 'editarclase/:idClase/:fechaf/:horaInicio/:horaFin/:horario/:nombreC/:profesor/:personas/:estatus',
  //   loadChildren: () => import('./paginas/editarclase/editarclase.module').then( m => m.EditarclasePageModule)
  // },
  {
    path: 'editarclase/:idClase/:horaInicio/:horaFin/:horario/:nombre/:profesor/:personas/:estatus/:dia',
    loadChildren: () => import('./paginas/editarclase/editarclase.module').then( m => m.EditarclasePageModule)
  },
  {
    path: 'asistentes/:idClase/:nombre/:profesor/:fechaf/:profesorNombre/:descripcionHorario',
    loadChildren: () => import('./paginas/asistentes/asistentes.module').then( m => m.AsistentesPageModule)
  },
  {
    path: 'clasesalumnos',
    loadChildren: () => import('./paginas/clasesalumnos/clasesalumnos.module').then( m => m.ClasesalumnosPageModule)
  },
  {
    path: 'asisalumno/:idClase/:nombre/:profesor',
    loadChildren: () => import('./paginas/asisalumno/asisalumno.module').then( m => m.AsisalumnoPageModule)
  },
  {
    path: 'calalumno',
    loadChildren: () => import('./paginas/calalumno/calalumno.module').then( m => m.CalalumnoPageModule)
  },
  {
    path: 'horarios/:fechaf',
    loadChildren: () => import('./paginas/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  // {
  //   path: 'crearclase/:fechaf',
  //   loadChildren: () => import('./paginas/crearclase/crearclase.module').then( m => m.CrearclasePageModule)
  // },
  {
    path: 'crearclase',
    loadChildren: () => import('./paginas/crearclase/crearclase.module').then( m => m.CrearclasePageModule)
  },
  {
    path: 'caladmin',
    loadChildren: () => import('./paginas/caladmin/caladmin.module').then( m => m.CaladminPageModule)
  },
  {
    path: 'horariosadmin/:fechaf/:idUser/:sociedad/:idRol',
    loadChildren: () => import('./paginas/horariosadmin/horariosadmin.module').then( m => m.HorariosadminPageModule)
  },
  {
    path: 'cambiarpass',
    loadChildren: () => import('./paginas/cambiarpass/cambiarpass.module').then( m => m.CambiarpassPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./paginas/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./paginas/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./paginas/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./paginas/clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'asuetos',
    loadChildren: () => import('./paginas/asuetos/asuetos.module').then( m => m.AsuetosPageModule)
  },
  {
    path: 'nuevoasueto',
    loadChildren: () => import('./paginas/nuevoasueto/nuevoasueto.module').then( m => m.NuevoasuetoPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./paginas/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'modal-inf-ea',
    loadChildren: () => import('./paginas/modal-inf-ea/modal-inf-ea.module').then( m => m.ModalInfEAPageModule)
  },
  {
    path: 'paquetes/:idUsuario/:sociedad',
    // path: 'paquetes/:idUsuario/:sociedad',
    loadChildren: () => import('./paginas/paquetes/paquetes.module').then( m => m.PaquetesPageModule)
  },
  {
    path: 'crearpaquete/:idUsuario/:sociedad/:idRol',
    loadChildren: () => import('./paginas/crearpaquete/crearpaquete.module').then( m => m.CrearpaquetePageModule)
  },
  {
    path: 'lugares/:fechaf/:descripcionHorario/:idClase/:asistencia/:lugar',
    loadChildren: () => import('./paginas/lugares/lugares.module').then( m => m.LugaresPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./paginas/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./paginas/shopping/shopping.module').then( m => m.ShoppingPageModule)
  },
  {
    path: 'hitorialasis',
    loadChildren: () => import('./paginas/hitorialasis/hitorialasis.module').then( m => m.HitorialasisPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./paginas/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'verproducto/:titulo/:descc/:descl/:costo',
    loadChildren: () => import('./paginas/verproducto/verproducto.module').then( m => m.VerproductoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
