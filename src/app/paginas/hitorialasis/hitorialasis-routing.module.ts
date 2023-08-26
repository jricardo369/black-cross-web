import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HitorialasisPage } from './hitorialasis.page';

const routes: Routes = [
  {
    path: '',
    component: HitorialasisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HitorialasisPageRoutingModule {}
