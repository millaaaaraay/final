import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CLrutinas } from '../models/CLrutinas';

@Component({
  selector: 'app-ejemplo-rutinas',
  templateUrl: './ejemplo-rutinas.page.html',
  styleUrls: ['./ejemplo-rutinas.page.scss'],
})
export class EjemploRutinasPage implements OnInit {
  rutinas: CLrutinas[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadRutinas();
  }

  loadRutinas() {
    this.dataService.getRutinas().subscribe(data => {
      this.rutinas = data;
    });
  }

}