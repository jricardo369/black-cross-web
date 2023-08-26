import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerproductoPageRoutingModule } from './verproducto-routing.module';

import { VerproductoPage } from './verproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerproductoPageRoutingModule
  ],
  declarations: [VerproductoPage]
})
export class VerproductoPageModule {}
