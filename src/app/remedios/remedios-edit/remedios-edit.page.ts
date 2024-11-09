import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DataService } from '../data.service';
import { Clremedios } from '../models/CLremedios';

@Component({
  selector: 'app-remedios-edit',
  templateUrl: './remedios-edit.page.html',
  styleUrls: ['./remedios-edit.page.scss'],
})
export class RemediosEditPage implements OnInit {
  productForm!: FormGroup;
  remedios: Clremedios = { id: 1, nombre: '', descripcion: '', dosis: '' };
  id: any = '';

  constructor(
    private restApi: DataService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Recoge el ID del remedio desde la URL
    this.id = this.route.snapshot.params['id'];
    this.getRemedio(this.id);

    // Define el formulario con validaciones
    this.productForm = this.formBuilder.group({
      rem_nombre: [null, Validators.required],
      rem_desc: [null, Validators.required],
      rem_dosis: [null, Validators.required],
    });
  }

  async onFormSubmit() {
    // Verifica si el formulario es válido
    if (!this.productForm.valid) {
      this.presentAlertConfirm('Por favor, rellena todos los campos.');
      return;
    }

    // Actualiza el objeto `remedios` con los valores del formulario
    this.remedios = {
      id: this.id,
      nombre: this.productForm.value.rem_nombre,
      descripcion: this.productForm.value.rem_desc,
      dosis: this.productForm.value.rem_dosis,
    };

    // Llama al servicio para actualizar los remedios
    this.restApi.updateRemedios(this.id, this.remedios).subscribe({
      next: () => {
        this.router.navigate(['/product-detail/', this.id]);
      },
      error: (err) => {
        console.error(err);
        this.presentAlertConfirm('Error al actualizar el remedio. Inténtalo de nuevo.');
      },
    });
  }

  async getRemedio(id: number) {
    // Obtiene los datos del remedio
    this.restApi.getRemedio(id).subscribe({
      next: (data) => {
        // Si funciona, asigna los valores al formulario
        this.productForm.setValue({
          rem_nombre: data.nombre,
          rem_desc: data.descripcion,
          rem_dosis: data.dosis,
        });
      },
      error: (err) => {
        console.error(err);
        // Aquí puedes manejar el error si lo deseas
      },
    });
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: msg,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Navega a la lista de productos si el usuario lo acepta
            this.router.navigate(['/product-list/']);
          },
        },
      ],
    });
    await alert.present();
  }
}
