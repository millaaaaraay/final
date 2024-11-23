
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Clremedios } from '../models/CLremedios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remedios-list',
  templateUrl: './remedios-list.page.html',
  styleUrls: ['./remedios-list.page.scss'],
})
export class RemediosListPage implements OnInit {
  remedios: Clremedios[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadRemedios();
  }

  loadRemedios() {
    this.dataService.getRemedios().subscribe(remedios => {
      this.remedios = remedios;
    });
  }

  deleteRemedio(id: number) {
    this.dataService.deleteRemedios(id).subscribe(() => {
      this.remedios = this.remedios.filter(remedio => remedio.id !== id);
      console.log(`Remedio con ID=${id} eliminado.`);
    });
  }
}
