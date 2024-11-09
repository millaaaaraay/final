import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../remedios/data.service';
import { BddService } from '../remedios/bdd.service';
import { Clusuarios } from '../remedios/models/Clusuarios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController,
    private bddService: BddService,
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      contrasena: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}')]]
    });
  }


  ngOnInit() {}

  async register() {
    if (this.formularioRegistro.valid) {
      console.log('Formulario válido, guardando...', this.formularioRegistro.value);
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      const nuevoUsuario = new Clusuarios({
        nombre: this.formularioRegistro.value.nombre,
        email: this.formularioRegistro.value.email,
        contrasena: this.formularioRegistro.value.contrasena
      });

      try {
        await this.bddService.addUsuario(nuevoUsuario);
        await this.bddService.sincronizarUsuarios();
        
        loading.dismiss();
        
        const alerta = await this.alertController.create({
          header: 'Información',
          message: 'Usuario creado con éxito',
          buttons: ['OK']
        });
        
        await alerta.present();
        await alerta.onDidDismiss();
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al agregar usuario:', error);
        loading.dismiss();
        
        const alertaError = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo crear el usuario',
          buttons: ['OK']
        });
        
        await alertaError.present();
      }
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.formularioRegistro.markAllAsTouched();
    }
  }
}