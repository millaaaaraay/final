import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { BddService } from '../bdd.service';
import { CLrutinas } from '../models/CLrutinas';

@Component({
  selector: 'app-rutinas-add',
  templateUrl: './rutinas-add.page.html',
  styleUrls: ['./rutinas-add.page.scss'],
})
export class RutinasAddPage implements OnInit {
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
      duracion: ['', Validators.required]
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

      this.dataService.getRutinas().subscribe({
        next: (rutinas) => {
          if (rutinas && rutinas.length > 0) {
            this.maxId = Math.max(...rutinas.map(r => r.id));
          }
        },
        complete: async () => {
          const nuevaRutina = new CLrutinas({
            id: this.maxId + 1,
            nombre: this.productForm.value.nombre,
            descripcion: this.productForm.value.descripcion,
            duracion: this.productForm.value.duracion
          });

          this.dataService.addRutina(nuevaRutina).subscribe({
            next: async (data) => {
              console.log('Data: ', data);
              loading.dismiss();

              if (data == null) {
                console.log('No se añadieron datos, data = null');
                return;
              } else {
                const alerta = await this.alertController.create({
                  header: 'Información',
                  message: 'Rutina creada con éxito',
                  buttons: ['OK']
                });

                await this.bddService.addRutina(nuevaRutina);
                await this.bddService.sincronizarRutinas();

                await alerta.present();
                await alerta.onDidDismiss();
                window.location.reload();
              }
            },
            error: (error) => {
              console.error('Error al agregar rutina:', error);
              loading.dismiss();
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener rutinas para el cálculo de ID:', error);
          loading.dismiss();
        }
      });
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.productForm.markAllAsTouched();
    }
  }
}