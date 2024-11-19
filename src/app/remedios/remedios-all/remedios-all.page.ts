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

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() { }

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

  volverAlMenu() {
    this.router.navigate(['/index']); 
  }
}
