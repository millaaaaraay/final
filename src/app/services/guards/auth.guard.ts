import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Almacenamiento local de Ionic
import { Observable } from 'rxjs'; // Importa Observable

@Injectable({
  providedIn: 'root' // Asegura que el servicio esté disponible en toda la aplicación
})
export class AuthGuard implements CanActivate {

  constructor(
    private storage: Storage, // Inyección del servicio de almacenamiento
    private router: Router // Inyección del enrutador para redirigir
  ) {}

  // El método canActivate controla el acceso a las rutas protegidas
  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storage.get('isLoggedIn'); // Verifica si el usuario está autenticado

    if (isLoggedIn) {
      return true; // Si está autenticado, permite el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, redirige a la página de login
      return false; // Bloquea el acceso a la ruta
    }
  }
}
