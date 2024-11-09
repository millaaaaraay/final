export class Clusuarios {
    id: number;
    nombre: string;
    email: string;
    contrasena: string;
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.email = obj && obj.email || null;
      this.contrasena = obj && obj.contrasena || null;
    }
  }
  