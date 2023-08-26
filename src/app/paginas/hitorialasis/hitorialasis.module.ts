import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HitorialasisPageRoutingModule } from './hitorialasis-routing.module';

import { HitorialasisPage } from './hitorialasis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HitorialasisPageRoutingModule
  ],
  declarations: [HitorialasisPage]
})
export class HitorialasisPageModule {}
