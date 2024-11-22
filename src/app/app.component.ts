import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ApiguardService } from './services/apiguard.service';
import { BddService } from './remedios/bdd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

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
    public  sqlite: SQLite,
    public dbinstance: BddService,
    private platform: Platform
  
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
    this.router.navigateByUrl('/login'); // Redirigir al usuario a la página de login después de cerrar sesión
  }

  async crearDB() {
    this.sqlite.create({
      name: 'data.db', // Nombre de la base de datos
      location: 'default', // Ubicación de la base de datos
    }).then((db) => {
      this.dbinstance.setDb(db); // Asignar la instancia de la base de datos a la propiedad dbinstance
      this.dbinstance.createTables();// Crear las tablas si no existen
      console.log('Base de datos creada');
    })
    .catch(error=>{console.error('Falló crear DB',error);});
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

  goToDetailRemedio() {
    this.router.navigate(['/remedios-detail']);
  }

  goToEditRemedio() {
    this.router.navigate(['/remedios-edit']);
  }

  goToListRemedios() {
    this.router.navigate(['/remedios-list']);
  }
}