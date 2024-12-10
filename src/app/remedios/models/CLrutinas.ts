
export class CLrutinas {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: string;
  
    constructor(obj: any) {
      this.id = obj && obj.id || null;
      this.nombre = obj && obj.nombre || null;
      this.descripcion = obj && obj.descripcion || null;
      this.duracion = obj && obj.duracion || null;
    }
  }
