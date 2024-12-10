import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { RutinasAddPageRoutingModule } from './rutinas-add-routing.module';

import { RutinasAddPage } from './rutinas-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinasAddPageRoutingModule,
    ReactiveFormsModule   // Asegúrate de agregar esto
  ],
  declarations: [RutinasAddPage]
})
export class RutinasAddPageModule {}
