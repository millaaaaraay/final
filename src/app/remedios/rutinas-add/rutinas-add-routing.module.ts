import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutinasAddPage } from './rutinas-add.page';

const routes: Routes = [
  {
    path: '',
    component: RutinasAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutinasAddPageRoutingModule {}
