import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiguardService } from '../services/apiguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  isModalOpen = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private fbl: FormBuilder,
    private navCtrl: NavController,
    private toastController: ToastController,
    private Storage: AuthService,
    private apiGuard: ApiguardService
  ) {
    this.formLogin = this.fbl.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}')]]
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const isLoggedIn = await this.Storage.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  async onLogin() {
    const userForm: string = this.formLogin.value.username;
    const passForm: string = this.formLogin.value.password;

    if (this.formLogin.valid) {
      console.log('Formulario válido, guardando...', this.formLogin.value);
      const loggedIn = await this.apiGuard.login(userForm, passForm);
      
      if (loggedIn) {
        await this.Storage.saveSession(userForm);
        console.log('Usuario Autenticado');
        let navExtra: NavigationExtras = { 
          state: { user: this.formLogin.value.username } 
        };
        this.router.navigate(['/index'], navExtra);
      }
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.formLogin.markAllAsTouched();
      await this.presentToast('Por favor revisa los campos del formulario');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  registrar() {
    this.router.navigate(['/registro']);
  }
}