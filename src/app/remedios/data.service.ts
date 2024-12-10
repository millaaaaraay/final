// data.service.ts
import { Injectable } from '@angular/core';
import { Clremedios } from './models/CLremedios';
import { Clusuarios } from './models/Clusuarios';
import { CLrutinas } from './models/CLrutinas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// URL del JSON Server
const apiUrl = "https://67536521f3754fcea7bb9f56.mockapi.io";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  /**
   * Maneja los errores de las operaciones HTTP.
   * @param operation Nombre de la operación que se está realizando
   * @param result Resultado por defecto en caso de error
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error); // Muestra el error en consola
      return of(result as T); // Retorna el resultado por defecto
    };
  }

  /**
   * Añade un nuevo remedio al servidor.
   * @param remedios Objeto de tipo Clremedios
   */
  addRemedio(remedios: Clremedios): Observable<Clremedios> {
    console.log("Añadiendo remedio:", remedios); // Verifica el contenido aquí
    return this.http.post<Clremedios>(apiUrl+'/remedios', remedios, httpOptions)
      .pipe(
        tap((producto: Clremedios) => console.log('Remedio añadido:', producto)),
        catchError(this.handleError<Clremedios>('addRemedio'))
      );
  }

  /**
   * Obtiene todos los remedios del servidor.
   */
  getRemedios(): Observable<Clremedios[]> {
    console.log("Obteniendo todos los remedios...");
    return this.http.get<Clremedios[]>(apiUrl+'/remedios')
      .pipe(
        tap(remedios => console.log('Remedios obtenidos:', remedios)),
        catchError(this.handleError('getRemedios', []))
      );
  }

  /**
   * Obtiene un remedio específico por ID.
   * @param id ID del remedio
   */
  getRemedio(id: number): Observable<Clremedios> {
    console.log("Obteniendo remedio con ID:", id);
    return this.http.get<Clremedios>(`${apiUrl+'/remedios'}/${id}`)
      .pipe(
        tap(_ => console.log(`Remedio obtenido con ID=${id}`)),
        catchError(this.handleError<Clremedios>(`getRemedio id=${id}`))
      );
  }

  /**
   * Elimina un remedio del servidor por ID.
   * @param id ID del remedio a eliminar
   */
  deleteRemedios(id: number): Observable<Clremedios> {
    return this.http.delete<Clremedios>(`${apiUrl}/remedios/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`Remedio eliminado con ID=${id}`)),
        catchError(this.handleError<Clremedios>('deleteRemedio'))
      );
  }

  /**
   * Actualiza un remedio existente.
   * @param id ID del remedio a actualizar
   * @param remedios Objeto de tipo Clremedios con los nuevos valores
   */
  updateRemedios(id: number, remedios: Clremedios): Observable<Clremedios> {
    return this.http.put<Clremedios>(`${apiUrl+'/remedios'}/${id}`, remedios, httpOptions)
      .pipe(
        tap(_ => console.log(`Remedio actualizado con ID=${id}`)),
        catchError(this.handleError<any>('updateRemedio'))
      );
  }

  /**
     * Añade un nuevo usuario al servidor.
     * @param usuario Objeto de tipo Clusuarios a añadir
     */
    addUsuario(usuario: Clusuarios): Observable<Clusuarios> {
      console.log("Añadiendo usuario:", usuario);
      return this.http.post<Clusuarios>(apiUrl+'/usuarios', usuario, httpOptions)
        .pipe(
          tap((nuevoUsuario: Clusuarios) => console.log('Usuario añadido:', nuevoUsuario)),
          catchError(this.handleError<Clusuarios>('addUsuario'))
        );
    }
  
    /**
     * Obtiene todos los usuarios del servidor.
     */
    getUsuarios(): Observable<Clusuarios[]> {
      console.log("Obteniendo todos los usuarios...");
      return this.http.get<Clusuarios[]>(apiUrl+'/usuarios')
        .pipe(
          tap(usuarios => console.log('Usuarios obtenidos:', usuarios)),
          catchError(this.handleError('getUsuarios', []))
        );
    }
  
    /**
     * Obtiene un usuario específico por ID.
     * @param id ID del usuario
     */
    getUsuario(id: number): Observable<Clusuarios> {
      console.log("Obteniendo usuario con ID:", id);
      return this.http.get<Clusuarios>(`${apiUrl+'/usuarios'}/${id}`)
        .pipe(
          tap(_ => console.log(`Usuario obtenido con ID=${id}`)),
          catchError(this.handleError<Clusuarios>(`getUsuario id=${id}`))
        );
    }
  
    /**
     * Elimina un usuario del servidor por ID.
     * @param id ID del usuario a eliminar
     */
    deleteUsuario(id: number): Observable<Clusuarios> {
      return this.http.delete<Clusuarios>(`${apiUrl}/usuarios/${id}`, httpOptions)
        .pipe(
          tap(_ => console.log(`Usuario eliminado con ID=${id}`)),
          catchError(this.handleError<Clusuarios>('deleteUsuario'))
        );
    }
  
    /**
     * Actualiza un usuario existente.
     * @param id ID del usuario a actualizar
     * @param usuario Objeto de tipo Clusuarios con los nuevos valores
     */
    updateUsuario(id: number, usuario: Clusuarios): Observable<Clusuarios> {
      return this.http.put<Clusuarios>(`${apiUrl+'/usuarios'}/${id}`, usuario, httpOptions)
        .pipe(
          tap(_ => console.log(`Usuario actualizado con ID=${id}`)),
          catchError(this.handleError<any>('updateUsuario'))
        );
    }

    /**
     * Añade una nueva rutina al servidor.
     * @param rutina Objeto de tipo CLrutinas a añadir
     */
    addRutina(rutina: CLrutinas): Observable<CLrutinas> {
      console.log("Añadiendo rutina:", rutina);
      return this.http.post<CLrutinas>(apiUrl+'/rutinas', rutina, httpOptions)
        .pipe(
          tap((nuevaRutina: CLrutinas) => console.log('Rutina añadida:', nuevaRutina)),
          catchError(this.handleError<CLrutinas>('addRutina'))
        );
    }
  
    /**
     * Obtiene todas las rutinas del servidor.
     */
    getRutinas(): Observable<CLrutinas[]> {
      console.log("Obteniendo todas las rutinas...");
      return this.http.get<CLrutinas[]>(apiUrl+'/rutinas')
        .pipe(
          tap(rutinas => console.log('Rutinas obtenidas:', rutinas)),
          catchError(this.handleError('getRutinas', []))
        );
    }
  
    /**
     * Obtiene una rutina específica por ID.
     * @param id ID de la rutina
     */
    getRutina(id: number): Observable<CLrutinas> {
      console.log("Obteniendo rutina con ID:", id);
      return this.http.get<CLrutinas>(`${apiUrl+'/rutinas'}/${id}`)
        .pipe(
          tap(_ => console.log(`Rutina obtenida con ID=${id}`)),
          catchError(this.handleError<CLrutinas>(`getRutina id=${id}`))
        );
    }
  
    /**
     * Elimina una rutina del servidor por ID.
     * @param id ID de la rutina a eliminar
     */
    deleteRutina(id: number): Observable<CLrutinas> {
      return this.http.delete<CLrutinas>(`${apiUrl}/rutinas/${id}`, httpOptions)
        .pipe(
          tap(_ => console.log(`Rutina eliminada con ID=${id}`)),
          catchError(this.handleError<CLrutinas>('deleteRutina'))
        );
    }
  
    /**
     * Actualiza una rutina existente.
     * @param id ID de la rutina a actualizar
     * @param rutina Objeto de tipo CLrutinas con los nuevos valores
     */
    updateRutina(id: number, rutina: CLrutinas): Observable<CLrutinas> {
      return this.http.put<CLrutinas>(`${apiUrl+'/rutinas'}/${id}`, rutina, httpOptions)
        .pipe(
          tap(_ => console.log(`Rutina actualizada con ID=${id}`)),
          catchError(this.handleError<any>('updateRutina'))
        );
    }
  
}
