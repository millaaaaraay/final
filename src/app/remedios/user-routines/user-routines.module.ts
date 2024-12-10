import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRoutinesPageRoutingModule } from './user-routines-routing.module';

import { UserRoutinesPage } from './user-routines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRoutinesPageRoutingModule
  ],
  declarations: [UserRoutinesPage]
})
export class UserRoutinesPageModule {}
