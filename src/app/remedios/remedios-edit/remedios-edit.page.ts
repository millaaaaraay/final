import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Clremedios } from '../models/CLremedios';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-remedios-edit',
  templateUrl: './remedios-edit.page.html',
  styleUrls: ['./remedios-edit.page.scss'],
})
export class RemediosEditPage implements OnInit {
  remedios!: Clremedios[];
  remedio!: Clremedios;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getRemedios().subscribe(remedios => {
      this.remedios = remedios;
      // Mostrar los remedios disponibles
      console.log('Remedios disponibles:', this.remedios);
      // Aquí podrías agregar lógica para mostrar los remedios y permitir al usuario seleccionar uno
    });
  }

  selectRemedio(id: number) {
    this.dataService.getRemedio(id).subscribe(remedio => {
      this.remedio = remedio;
      // Lógica para manejar la selección del remedio
      console.log('Remedio seleccionado:', this.remedio);
    });
  }

  save() {
    this.dataService.updateRemedios(this.remedio.id, this.remedio).subscribe(() => {
      console.log('Remedio actualizado:', this.remedio);
      this.router.navigate(['/remedios-all']);
    });
  }
}  
