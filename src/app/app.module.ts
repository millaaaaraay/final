import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Importamos BrowserAnimationsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importamos IonicStorageModule
import { IonicStorageModule } from '@ionic/storage-angular';
import { RemediosEditPage } from './remedios/remedios-edit/remedios-edit.page';

@NgModule({
  declarations: [AppComponent],  // Agregamos RemediosEditPage aquí
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Agregamos IonicStorageModule aquí
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,  // Agregamos BrowserAnimationsModule aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
