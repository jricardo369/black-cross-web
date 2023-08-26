import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfEAPageRoutingModule } from './modal-inf-ea-routing.module';

import { ModalInfEAPage } from './modal-inf-ea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfEAPageRoutingModule
  ],
  declarations: [ModalInfEAPage]
})
export class ModalInfEAPageModule {}
