import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroas'
})
export class FiltroasPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {

    if (texto === '') {
      return arreglo;
    }
    if (!arreglo) {
      return arreglo;
    }

    texto= texto.toLowerCase();

    return arreglo.filter(item => {

      return item.fecha.toLowerCase().includes(texto);

    });
    
  }

}
