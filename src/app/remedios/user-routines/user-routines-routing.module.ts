import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRoutinesPage } from './user-routines.page';

const routes: Routes = [
  {
    path: '',
    component: UserRoutinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutinesPageRoutingModule {}
