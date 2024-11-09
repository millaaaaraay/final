// models/CLremedios.ts
export class Clremedios {
    id: number;
    nombre: string;
    descripcion: string;
    dosis: string;
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.descripcion = obj && obj.descripcion || null;
      this.dosis = obj && obj.dosis || null;
    }
  }
  