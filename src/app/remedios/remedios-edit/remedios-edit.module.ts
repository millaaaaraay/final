import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  

import { IonicModule } from '@ionic/angular';

import { RemediosEditPageRoutingModule } from './remedios-edit-routing.module';

import { RemediosEditPage } from './remedios-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,
    RemediosEditPageRoutingModule
  ],
  declarations: [RemediosEditPage]
})
export class RemediosEditPageModule {}
