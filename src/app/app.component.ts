import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ApiguardService } from './services/apiguard.service';
import { BddService } from './remedios/bdd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    public router: Router,
    private authService: ApiguardService,
    public sqlite: SQLite,
    public dbinstance: BddService,
    private platform: Platform,
    private alertCtrl: AlertController // Inyectar AlertController
  ) {
    this.initializeApp();
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async initializeApp() {
    await this.platform.ready(); // Esperar a que la plataforma esté lista (esto asegura que todo esté inicializado correctamente)
    const isLoggedIn = await this.authService.isLoggedIn(); // Verificar si el usuario ya ha iniciado sesión
  }

  // Método para cerrar sesión
  async logout() {
    await this.storage.clear(); // Limpiar el almacenamiento
    await this.authService.logout(); // Llamar al método logout del servicio de autenticación
    this.router.navigate(['/home'], { replaceUrl: true }); // Redirigir al login y reemplazar la historia de navegación
  }

  async crearDB() {
    this.sqlite
      .create({
        name: 'data.db', // Nombre de la base de datos
        location: 'default', // Ubicación de la base de datos
      })
      .then((db) => {
        this.dbinstance.setDb(db); // Asignar la instancia de la base de datos a la propiedad dbinstance
        this.dbinstance.createTables(); // Crear las tablas si no existen
        console.log('Base de datos creada');
      })
      .catch((error) => {
        console.error('Falló crear DB', error);
      });
  }

  goToRemedios() {
    this.router.navigate(['/remedios']);
  }

  goToAddRemedio() {
    this.router.navigate(['/remedios-add']);
  }

  goToAllRemedios() {
    this.router.navigate(['/remedios-all']);
  }

  goToEditRemedio() {
    this.router.navigate(['/remedios-edit']);
  }

  goToListRemedios() {
    this.router.navigate(['/remedios-list']);
  }

  goTorutinas() {
    this.router.navigate(['/rutinas-add']);
  }

  goTousercronometro() {
    this.router.navigate(['/user-routines']);
  }


  async CerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: `
        ¿Estás segura/o de que deseas cerrar sesión?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          handler: async () => {
            await this.logout(); // Llamar al método de logout
          },
        },
      ],
    });
  
    await alert.present(); // Mostrar el modal
  }
}