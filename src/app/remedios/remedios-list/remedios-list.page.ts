import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Clremedios } from '../models/CLremedios';

@Component({
  selector: 'app-remedios-list',
  templateUrl: './remedios-list.page.html',
  styleUrls: ['./remedios-list.page.scss'],
})
export class RemediosListPage implements OnInit {
  remedios: Clremedios[] = []; // Arreglo para almacenar los remedios

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadRemedios(); // Cargar los remedios al inicializar el componente
  }

  /**
   * Carga la lista de remedios desde el servidor.
   */
  loadRemedios() {
    this.dataService.getRemedios().subscribe(remedios => {
      this.remedios = remedios;
      console.log('Remedios cargados:', remedios);
    });
  }

  /**
   * Elimina un remedio por ID y actualiza la lista local.
   * @param id ID del remedio a eliminar
   */
  deleteRemedio(id: number) {
    this.dataService.deleteRemedios(id).subscribe(() => {
      // Actualizar la lista local después de la eliminación
      this.remedios = this.remedios.filter(remedio => remedio.id !== id);
      console.log(`Remedio con ID=${id} eliminado.`);
    });
  }
}
