import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiguardService } from './apiguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private apiguardService: ApiguardService,
    private router: Router,
    private storage: Storage
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isAuthenticated = true;

    if (await this.storage.get('isLoggedIn')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}