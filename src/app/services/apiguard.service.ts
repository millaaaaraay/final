import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../remedios/data.service';
import { lastValueFrom } from 'rxjs';
import { Clusuarios } from '../remedios/models/Clusuarios'; // Modelo de usuarios

@Injectable({
  providedIn: 'root' // Servicio disponible en toda la aplicación
})
export class ApiguardService {

  constructor(
    private storage: Storage, 
    private dataService: DataService, 
    private alertController: AlertController, 
    private router: Router
  ) {
    this.ngOnInit(); // Inicializa el almacenamiento
  }

  async ngOnInit() {
    await this.storage.create(); // Crea el almacenamiento al iniciar el servicio
  }

  // Método de login
  async login(email: string, contrasena: string): Promise<boolean> {
    try {
      const users: Clusuarios[] = await lastValueFrom(this.dataService.getUsuarios());
      const foundUser = users.find(user => user.email === email);

      if (foundUser) {
        if (contrasena === foundUser.contrasena) {
          await this.storage.set('isLoggedIn', true);  // Guarda el estado de login
          await this.storage.set('user', foundUser.nombre);  // Guarda el nombre del usuario
          return true;
        } else {
          this.showAlert('Contraseña incorrecta');
          return false;
        }
      } else {
        this.showAlert('Usuario no encontrado');
        return false;
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      return false;
    }
  }

  // Verifica si el usuario está logueado
  async isLoggedIn(): Promise<boolean> {
    return !!(await this.storage.get('isLoggedIn'));
  }

  // Cierra la sesión
  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Obtiene el nombre del usuario
  async getUsuario(): Promise<string> {
    const user = await this.storage.get('user');
    return user ? String(user) : 'Invitado';
  }

  // Muestra alertas
  private async showAlert(message: string) {
    const alerta = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alerta.present();
  }
}
