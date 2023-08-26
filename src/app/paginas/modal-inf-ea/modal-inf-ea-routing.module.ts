import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfEAPage } from './modal-inf-ea.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfEAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfEAPageRoutingModule {}
