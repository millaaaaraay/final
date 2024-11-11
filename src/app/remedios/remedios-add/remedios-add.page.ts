import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { BddService } from '../bdd.service';
import { Clremedios } from '../models/CLremedios';

@Component({
  selector: 'app-remedios-add',
  templateUrl: './remedios-add.page.html',
  styleUrls: ['./remedios-add.page.scss'],
})
export class RemediosAddPage implements OnInit {
  productForm: FormGroup;
  maxId = 0;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController,
    private bddService: BddService,
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dosis: ['', Validators.required]
    });
  }

  ngOnInit() { }

  async onFormSubmit() {
    if (this.productForm.valid) {
      console.log('Formulario válido, guardando...', this.productForm.value);
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      this.dataService.getRemedios().subscribe({
        next: (remedios) => {
          if (remedios && remedios.length > 0) {
            this.maxId = Math.max(...remedios.map(r => r.id));
          }
        },
        complete: async () => {
          const nuevoRemedio = new Clremedios({
            id: this.maxId + 1,
            nombre: this.productForm.value.nombre,
            descripcion: this.productForm.value.descripcion,
            dosis: this.productForm.value.dosis
          });

          this.dataService.addRemedio(nuevoRemedio).subscribe({
            next: async (data) => {
              console.log('Data: ', data);
              loading.dismiss();

              if (data == null) {
                console.log('No se añadieron datos, data = null');
                return;
              } else {
                const alerta = await this.alertController.create({
                  header: 'Información',
                  message: 'Remedio creado con éxito',
                  buttons: ['OK']
                });

                await this.bddService.addRemedio(nuevoRemedio);
                await this.bddService.sincronizarRemedios();

                await alerta.present();
                await alerta.onDidDismiss();
                window.location.reload();
              }
            },
            error: (error) => {
              console.error('Error al agregar remedio:', error);
              loading.dismiss();
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener remedios para el cálculo de ID:', error);
          loading.dismiss();
        }
      });
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.productForm.markAllAsTouched();
    }
  }
}