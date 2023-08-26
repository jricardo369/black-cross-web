import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroasPipe } from './filtroas.pipe';

@NgModule({
  declarations: [FiltroPipe, FiltroasPipe],
  exports: [FiltroPipe ,FiltroasPipe],
  imports: []
})
export class PipesModule { }
