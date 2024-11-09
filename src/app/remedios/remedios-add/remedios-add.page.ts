import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Clremedios } from '../models/CLremedios';
import { DataService } from '../data.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-remedios-add',
  templateUrl: './remedios-add.page.html',
  styleUrls: ['./remedios-add.page.scss'],
})
export class RemediosAddPage implements OnInit {
  
  productForm!: FormGroup;
  remedios: Clremedios = {
    id: 0, 
    nombre: '',
    descripcion: '',
    dosis: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: DataService,
    private router: Router,
    private sqlite: SQLite
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      rem_nombre: [null, Validators.required],
      rem_desc: [null, Validators.required],
      rem_dosis: [null, Validators.required]
    });

    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      const db: SQLiteObject = await this.sqlite.create({
        name: 'remedios.db',
        location: 'default'
      });

      await db.executeSql('CREATE TABLE IF NOT EXISTS remedios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, descripcion TEXT, dosis TEXT)', []);
    } catch (error) {
      console.error('Error al inicializar la base de datos', error);
    }
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    // Verificar si el formulario es inválido
    if (this.productForm.invalid) {
      loading.dismiss();
      return; // Salir si el formulario es inválido
    }

    // Asignar valores del formulario al objeto remedios
    this.remedios.nombre = this.productForm.value.rem_nombre;
    this.remedios.descripcion = this.productForm.value.rem_desc;
    this.remedios.dosis = this.productForm.value.rem_dosis;

    try {
      const db: SQLiteObject = await this.sqlite.create({
        name: 'remedios.db',
        location: 'default'
      });

      // Guardar en SQLite
      await db.executeSql('INSERT INTO remedios (nombre, descripcion, dosis) VALUES (?, ?, ?)', 
        [this.remedios.nombre, this.remedios.descripcion, this.remedios.dosis]);

      // Enviar los datos a JSON Server
      this.restApi.addRemedio(this.remedios).subscribe({
        next: async (res) => {
          console.log('Remedio guardado en JSON Server:', res);
          loading.dismiss();
          this.router.navigate(['/product-list']);
        },
        error: (err) => {
          loading.dismiss();
          console.error('Error en la llamada a la API', err);
        }
      });
    } catch (error) {
      loading.dismiss();
      console.error('Error al guardar el remedio', error);
    }
  }
}
