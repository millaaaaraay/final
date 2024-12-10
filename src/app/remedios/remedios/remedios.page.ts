import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-remedios',
  templateUrl: './remedios.page.html',
  styleUrls: ['./remedios.page.scss'],
})
export class RemediosPage implements OnInit {
  images: string[] = [];

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
  }

  async requestCameraPermissions() {
    if (Capacitor.getPlatform() !== 'web') {
      const permissions = await Camera.requestPermissions({
        permissions: ['camera', 'photos']
      });

      if (permissions.camera === 'granted' && permissions.photos === 'granted') {
        console.log('Permisos concedidos');
      } else {
        console.log('Permisos denegados');
      }
    } else {
      console.log('La cámara no está disponible en la web.');
    }
  }

  async selectImage() {
    await this.requestCameraPermissions();
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Acción:',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.getImage(CameraSource.Camera);
          }
        },
        {
          text: 'Seleccionar de la Galería',
          handler: () => {
            this.getImage(CameraSource.Photos);
          }
        },
        {
          text: 'Eliminar Todas las Fotos',
          handler: () => {
            this.deleteAllImages();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async getImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source
    });

    if (image.dataUrl) {
      this.images.push(image.dataUrl);
    }
  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
  }

  deleteAllImages() {
    this.images = [];
  }
}