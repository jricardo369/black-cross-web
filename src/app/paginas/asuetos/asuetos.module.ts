import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AsuetosPageRoutingModule } from './asuetos-routing.module';
import { AsuetosPage } from './asuetos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsuetosPageRoutingModule,
    PipesModule
  ],
  declarations: [AsuetosPage]
})
export class AsuetosPageModule {}
