import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjemploRutinasPageRoutingModule } from './ejemplo-rutinas-routing.module';

import { EjemploRutinasPage } from './ejemplo-rutinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjemploRutinasPageRoutingModule
  ],
  declarations: [EjemploRutinasPage]
})
export class EjemploRutinasPageModule {}
