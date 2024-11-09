// Importaciones necesarias
import { Injectable } from '@angular/core'; // Decorador para servicios inyectables
import { Storage } from '@ionic/storage-angular'; // Almacenamiento local de Ionic
import { Clusuarios } from '../remedios/models/Clusuarios'; // Modelo de usuarios
import { lastValueFrom } from 'rxjs'; // Convertir Observable a Promise
import { AlertController } from '@ionic/angular'; // Controlador de alertas de Ionic
import { Router } from '@angular/router'; // Navegación entre rutas
import { DataService } from '../remedios/data.service'; // Servicio de datos

@Injectable({
  providedIn: 'root' // Servicio disponible en toda la aplicación
})
export class ApiguardService {

  // Constructor con inyección de dependencias
  constructor(
    private storage: Storage, // Almacenamiento local
    private dataService: DataService, // Servicio de datos
    private alertController: AlertController, // Controlador de alertas
    private router: Router // Enrutador
  ) {
    this.ngOnInit(); // Inicializa el almacenamiento al crear el servicio
  }

  // Inicialización del almacenamiento
  async ngOnInit() {
    await this.storage.create();
  }

  // Método de inicio de sesión
  async login(email: string, contrasena: string): Promise<boolean> {
    try {
      // Obtiene lista de usuarios y convierte Observable a Promise
      const users: Clusuarios[] = await lastValueFrom(this.dataService.getUsuarios());
      // Busca usuario por email
      const foundUser = users.find(user => user.email === email);

      if (foundUser) {
        console.log(foundUser);
        console.log('Auth Usuario:', foundUser.nombre, '-', foundUser.contrasena);

        // Verifica la contraseña
        if (contrasena === foundUser.contrasena) {
          // Guarda estado de sesión y nombre de usuario
          await this.storage.set('isLoggedIn', true);
          await this.storage.set('user', foundUser.nombre);
          return true;
        } else {
          // Muestra alerta si la contraseña es incorrecta
          const alerta = await this.alertController.create({
            header: 'Error',
            message: 'Contraseña incorrecta',
            buttons: ['OK']
          });
          await alerta.present();
          console.log('Contraseña incorrecta');
          return false;
        }
      } else {
        // Muestra alerta si el usuario no existe
        const alerta = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no encontrado',
          buttons: ['OK']
        });
        await alerta.present();
      }
      return false;
    } catch (error) {
      console.error('Error en autenticación: ', error);
      return false;
    }
  }

  // Verifica si hay una sesión activa
  async isLoggedIn(): Promise<boolean> {
    return !!(await this.storage.get('isLoggedIn'));
  }

  // Cierra la sesión
  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Obtiene el nombre del usuario actual
  async getUsuario(): Promise<string> {
    const user = await this.storage.get('user');
    return user ? String(user) : 'Invitado';
  }
}