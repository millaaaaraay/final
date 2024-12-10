import { Component, OnInit, OnDestroy } from '@angular/core';
import { CLrutinas } from '../models/CLrutinas';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-routines',
  templateUrl: './user-routines.page.html',
  styleUrls: ['./user-routines.page.scss'],
})
export class UserRoutinesPage implements OnInit, OnDestroy {

  routines: CLrutinas[] = [];
  selectedRoutine: CLrutinas | null = null;
  timeElapsed = 0;
  isRunning = false;
  timer: any;
  targetTime = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadRoutines();
  }

  ngOnDestroy() {
    // Detener el cronómetro al salir de la vista para evitar memory leaks
    if (this.isRunning) {
      this.stopTimer();
    }
  }

  // Cargar rutinas desde el DataService
  loadRoutines() {
    this.dataService.getRutinas().subscribe(
      (data) => {
        this.routines = data;
      },
      (error) => {
        console.error('Error al cargar las rutinas', error);
      }
    );
  }

  // Seleccionar rutina
  selectRoutine(routine: CLrutinas) {
    this.selectedRoutine = routine;
    this.timeElapsed = 0;
    this.targetTime = routine.duracion ? Number(routine.duracion) : 0;
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Iniciar el cronómetro
  startTimer() {
    if (this.isRunning) return;

    this.isRunning = true;

    this.timer = setInterval(() => {
      this.timeElapsed += 1;
      if (this.targetTime > 0 && this.timeElapsed >= this.targetTime * 60) {
        this.stopTimer();
      }
    }, 1000);
  }

  // Detener el cronómetro
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.isRunning = false;
  }

  // Formatear el tiempo en minutos y segundos
  getFormattedTime() {
    const minutes = Math.floor(this.timeElapsed / 60);
    const seconds = this.timeElapsed % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Obtener el tiempo objetivo formateado
  getTargetTimeFormatted() {
    if (!this.targetTime) return '00:00';
    const minutes = this.targetTime;
    return `${minutes.toString().padStart(2, '0')}:00`;
  }
}