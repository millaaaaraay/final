import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiguardService } from '../apiguard.service';


export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const storage = inject(Storage);
  const apiguardService = inject(ApiguardService);

  if (await storage.get('isLoggedIn')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};