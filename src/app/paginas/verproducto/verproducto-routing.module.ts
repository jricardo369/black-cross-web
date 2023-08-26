import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerproductoPage } from './verproducto.page';

const routes: Routes = [
  {
    path: '',
    component: VerproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerproductoPageRoutingModule {}
