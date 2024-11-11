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
  maxId = 0;

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

  ngOnInit() { }

  async register() {
    if (this.formularioRegistro.valid) {
      console.log('Formulario válido, guardando...', this.formularioRegistro.value);
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      this.dataService.getUsuarios().subscribe({
        next: (usuarios) => {
          if (usuarios && usuarios.length > 0) {
            this.maxId = Math.max(...usuarios.map(u => u.id));
          }
        },
        complete: async () => {
          const nuevoUsuario = new Clusuarios({
            id: this.maxId + 1,
            nombre: this.formularioRegistro.value.nombre,
            email: this.formularioRegistro.value.email,
            contrasena: this.formularioRegistro.value.contrasena
          });

          this.dataService.addUsuario(nuevoUsuario).subscribe({
            next: async (data) => {
              console.log('Data: ', data);
              loading.dismiss();
              
              if (data == null) {
                console.log('No se añadieron datos, data = null');
                return;
              } else {
                const alerta = await this.alertController.create({
                  header: 'Información',
                  message: 'Usuario creado con éxito',
                  buttons: ['OK']
                });

                await this.bddService.addUsuario(nuevoUsuario);
                await this.bddService.sincronizarUsuarios();
                
                await alerta.present();
                await alerta.onDidDismiss();
                window.location.reload();
              }
            },
            error: (error) => {
              console.error('Error al agregar usuario:', error);
              loading.dismiss();
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener usuarios para el cálculo de ID:', error);
          loading.dismiss();
        }
      });
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.formularioRegistro.markAllAsTouched();
    }
  }
}