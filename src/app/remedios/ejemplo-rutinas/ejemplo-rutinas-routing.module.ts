import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjemploRutinasPage } from './ejemplo-rutinas.page';

const routes: Routes = [
  {
    path: '',
    component: EjemploRutinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjemploRutinasPageRoutingModule {}
