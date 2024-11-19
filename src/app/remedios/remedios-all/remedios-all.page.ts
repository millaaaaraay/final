import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clremedios } from '../models/CLremedios';
import { DataService } from '../data.service';

@Component({
  selector: 'app-remedios-all',
  templateUrl: './remedios-all.page.html',
  styleUrls: ['./remedios-all.page.scss'],
})
export class RemediosAllPage implements OnInit {
  msgError = "";
  producto: Clremedios | null = null;
  id: string = '';
  todosRemedios: Clremedios[] = [];
  mostrarTodos: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.verTodosRemedios();
  }

  leer() {
    const remedioId = parseInt(this.id, 10);
    if (isNaN(remedioId) || remedioId <= 0) {
      this.msgError = 'Por favor, introduce un ID válido.';
      return;
    }

    this.dataService.getRemedio(remedioId).subscribe({
      next: (remedio) => {
        if (remedio) {
          this.producto = remedio;
          this.msgError = '';
          console.log('Nombre:', remedio.nombre);
          console.log('Descripción:', remedio.descripcion);
          console.log('Dosis:', remedio.dosis);
        } else {
          this.msgError = `No se encontró un remedio con el ID ${remedioId}.`;
          this.producto = null;
        }
      },
      error: (error) => {
        console.error('Error al buscar remedio:', error);
        this.msgError = 'Ocurrió un error al buscar el remedio.';
        this.producto = null;
      }
    });
  }

  limpiarBusqueda() {
    this.producto = null;
    this.id = '';
    this.msgError = '';
  }

  verTodosRemedios() {
    this.mostrarTodos = true;
    this.dataService.getRemedios().subscribe({
      next: (remedios) => {
        if (remedios && remedios.length > 0) {
          this.todosRemedios = remedios;
          this.msgError = '';
          remedios.forEach(remedio => {
            console.log('Nombre:', remedio.nombre);
            console.log('Descripción:', remedio.descripcion);
            console.log('Dosis:', remedio.dosis);
          });
        } else {
          this.msgError = 'No hay remedios disponibles.';
          this.todosRemedios = [];
        }
      },
      error: (error) => {
        console.error('Error al obtener todos los remedios:', error);
        this.msgError = 'Ocurrió un error al obtener los remedios.';
        this.todosRemedios = [];
      }
    });
  }

  ocultarTodosRemedios() {
    this.mostrarTodos = false;
    this.todosRemedios = [];
  }

  volverAlMenu() {
    this.router.navigate(['/index']); 
  }
}