import { Injectable } from '@angular/core';
import { Observable, of, throwError, interval, lastValueFrom } from 'rxjs';
import { DataService } from './data.service';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { switchMap } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Clremedios } from './models/CLremedios';
import { Clusuarios } from './models/Clusuarios';
import { CLrutinas } from './models/CLrutinas';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BddService {
  private dbInstance!: SQLiteObject;

  constructor(
    private dataService: DataService,
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.initDatabase();
    });
    this.startBackgroundSync();
  }

  async initDatabase(): Promise<void> {
    try {
      const db = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });
      this.setDb(db);
      await this.createTables();
    } catch (e) {
      console.error('Error opening database', e);
      throw e;
    }
  }

  setDb(db: SQLiteObject) {
    if (!this.dbInstance) {
      this.dbInstance = db;
    }
  }

  async createTables(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS remedios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        dosis TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        contrasena TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS rutinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        duracion TEXT NOT NULL
      );
    `;

    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql(sql, []);
        console.log('Tables created');
      } catch (e) {
        console.error('Error creating tables', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  private startBackgroundSync() {
    interval(600000)
      .pipe(
        switchMap(() => {
          console.log('Iniciando sincronización de datos en segundo plano...');
          return this.dataService.getRemedios();
        })
      )
      .subscribe({
        next: async (remedios) => {
          await this.insertRemedios(remedios);
          console.log('Sincronización de datos completada.');
        },
        error: (error) => {
          console.error('Error durante la sincronización de datos:', error);
        },
      });
  }

  async insertRemedios(remedios: Clremedios[]) {
    if (this.dbInstance) {
      const sql = 'INSERT OR REPLACE INTO remedios (id, nombre, descripcion, dosis) VALUES (?, ?, ?, ?)';
      for (const remedio of remedios) {
        await this.dbInstance.executeSql(sql, [remedio.id, remedio.nombre, remedio.descripcion, remedio.dosis]);
      }
    }
  }

  async insertUsuarios(usuarios: Clusuarios[]) {
    if (this.dbInstance) {
      const sql = 'INSERT OR REPLACE INTO usuarios (id, nombre, email, contrasena) VALUES (?, ?, ?, ?)';
      for (const usuario of usuarios) {
        await this.dbInstance.executeSql(sql, [usuario.id, usuario.nombre, usuario.email, usuario.contrasena]);
      }
    }
  }

  async insertRutinas(rutinas: CLrutinas[]) {
    if (this.dbInstance) {
      const sql = 'INSERT OR REPLACE INTO rutinas (id, nombre, descripcion, duracion) VALUES (?, ?, ?, ?)';
      for (const rutina of rutinas) {
        await this.dbInstance.executeSql(sql, [rutina.id, rutina.nombre, rutina.descripcion, rutina.duracion]);
      }
    }
  }

  async addRemedio(remedio: Clremedios): Promise<Clremedios> {
    const sql = 'INSERT INTO remedios (nombre, descripcion, dosis) VALUES (?, ?, ?)';
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql(sql, [remedio.nombre, remedio.descripcion, remedio.dosis]);
        return remedio;
      } catch (e) {
        console.error('Error adding remedio', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async addUsuario(usuario: Clusuarios): Promise<Clusuarios> {
    const sql = 'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)';
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql(sql, [usuario.nombre, usuario.email, usuario.contrasena]);
        return usuario;
      } catch (e) {
        console.error('Error adding usuario', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async addRutina(rutina: CLrutinas): Promise<CLrutinas> {
    const sql = 'INSERT INTO rutinas (nombre, descripcion, duracion) VALUES (?, ?, ?)';
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql(sql, [rutina.nombre, rutina.descripcion, rutina.duracion]);
        return rutina;
      } catch (e) {
        console.error('Error adding rutina', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async getRemedios(): Promise<Clremedios[]> {
    const sql = 'SELECT * FROM remedios';
    if (this.dbInstance) {
      try {
        const result = await this.dbInstance.executeSql(sql, []);
        const remedios: Clremedios[] = [];
        for (let i = 0; i < result.rows.length; i++) {
          remedios.push(result.rows.item(i));
        }
        return remedios;
      } catch (e) {
        console.error('Error fetching remedios', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async getUsuarios(): Promise<Clusuarios[]> {
    const sql = 'SELECT * FROM usuarios';
    if (this.dbInstance) {
      try {
        const result = await this.dbInstance.executeSql(sql, []);
        const usuarios: Clusuarios[] = [];
        for (let i = 0; i < result.rows.length; i++) {
          usuarios.push(result.rows.item(i));
        }
        return usuarios;
      } catch (e) {
        console.error('Error fetching usuarios', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async getRutinas(): Promise<CLrutinas[]> {
    const sql = 'SELECT * FROM rutinas';
    if (this.dbInstance) {
      try {
        const result = await this.dbInstance.executeSql(sql, []);
        const rutinas: CLrutinas[] = [];
        for (let i = 0; i < result.rows.length; i++) {
          rutinas.push(result.rows.item(i));
        }
        return rutinas;
      } catch (e) {
        console.error('Error fetching rutinas', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async sincronizarRemedios(): Promise<void> {
    const sql = 'SELECT * FROM remedios';
    if (this.dbInstance) {
      const result = await this.dbInstance.executeSql(sql, []);
      
      for (let i = 0; i < result.rows.length; i++) {
        const remedio = result.rows.item(i);
        
        try {
          const apiRemedio = await lastValueFrom(this.dataService.getRemedio(remedio.id));
          
          if (apiRemedio) {
            await this.dbInstance.executeSql('DELETE FROM remedios WHERE id = ?', [remedio.id]);
            console.log(`Remedio con id ${remedio.id} eliminado del almacenamiento local`);
          }
        } catch (error: unknown) {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            await lastValueFrom(this.dataService.addRemedio(remedio));
            console.log(`Remedio con id ${remedio.id} añadido al servidor`);
            await this.dbInstance.executeSql('DELETE FROM remedios WHERE id = ?', [remedio.id]);
          } else {
            console.error(`Error al sincronizar el remedio con id ${remedio.id}:`, error);
          }
        }
      }
    }
  }

  async sincronizarUsuarios(): Promise<void> {
    const sql = 'SELECT * FROM usuarios';
    if (this.dbInstance) {
      const result = await this.dbInstance.executeSql(sql, []);
      
      for (let i = 0; i < result.rows.length; i++) {
        const usuario = result.rows.item(i);
        
        try {
          const apiUsuario = await lastValueFrom(this.dataService.getUsuario(usuario.id));
          
          if (apiUsuario) {
            await this.dbInstance.executeSql('DELETE FROM usuarios WHERE id = ?', [usuario.id]);
            console.log(`Usuario con id ${usuario.id} eliminado del almacenamiento local`);
          }
        } catch (error: unknown) {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            await lastValueFrom(this.dataService.addUsuario(usuario));
            console.log(`Usuario con id ${usuario.id} añadido al servidor`);
            await this.dbInstance.executeSql('DELETE FROM usuarios WHERE id = ?', [usuario.id]);
          } else {
            console.error(`Error al sincronizar el usuario con id ${usuario.id}:`, error);
          }
        }
      }
    }
  }

  async sincronizarRutinas(): Promise<void> {
    const sql = 'SELECT * FROM rutinas';
    if (this.dbInstance) {
      const result = await this.dbInstance.executeSql(sql, []);
      
      for (let i = 0; i < result.rows.length; i++) {
        const rutina = result.rows.item(i);
        
        try {
          const apiRutina = await lastValueFrom(this.dataService.getRutina(rutina.id));
          
          if (apiRutina) {
            await this.dbInstance.executeSql('DELETE FROM rutinas WHERE id = ?', [rutina.id]);
            console.log(`Rutina con id ${rutina.id} eliminada del almacenamiento local`);
          }
        } catch (error: unknown) {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            await lastValueFrom(this.dataService.addRutina(rutina));
            console.log(`Rutina con id ${rutina.id} añadida al servidor`);
            await this.dbInstance.executeSql('DELETE FROM rutinas WHERE id = ?', [rutina.id]);
          } else {
            console.error(`Error al sincronizar la rutina con id ${rutina.id}:`, error);
          }
        }
      }
    }
  }
}